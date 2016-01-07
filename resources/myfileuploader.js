
/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
Math.uuid = (function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 
 
  return function (len, radix) {
    var chars = CHARS, uuid = [], rnd = Math.random;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | rnd()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | rnd()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
        }
      }
    }
 
    return '{'+uuid.join('')+'}';
  };
})();

if( typeof(Date.prototype.toLocaleFormat)=='undefined'){
Date.prototype.toLocaleFormat = function(format) {
	    var f = {y : (this.getYear())%100 ,Y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()}
	    for(var k in f)
	        format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	    return format;
	};
}

// Для начала определим метод XMLHttpRequest.sendAsBinary(),
// если он не определен (Например, для браузера Google Chrome). 

if (!XMLHttpRequest.prototype.sendAsBinary) {

    XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
        function byteValue(x) {
            return x.charCodeAt(0) & 0xff;
            }
        var ords = Array.prototype.map.call(datastr, byteValue);
        var ui8a = new Uint8Array(ords);
        this.send(ui8a.buffer);
        }
    }
/**
 * Класс FileUploader.
 * @param ioptions Ассоциативный массив опций загрузки 
 */
function FileUploader(ioptions) {

	// Позиция, с которой будем загружать файл
    this.position=0;

	// Размер загружаемого файла
    this.filesize=0;

	// Объект Blob или File (FileList[i])
    this.file = null;

	// Ассоциативный массив опций
    this.options=ioptions;

	// Если не определена опция uploadscript, то возвращаем null. Нельзя
	// продолжать, если эта опция не определена.
    if (this.options['uploadscript']==undefined) return null;

	/*
	* Проверка, поддерживает ли браузер необходимые объекты 
	* @return true, если браузер поддерживает все необходимые объекты
	*/
    this.CheckBrowser=function() {
        if (window.File && window.FileReader && window.FileList && window.Blob) return true; else return false;
        }
		
	this.BreakUpload=false;
	
	this.BreakUploadFunc=function(){
			// Текущий объект
			var that=this;

			// Очистим таймаут
			clearTimeout(that.xhrHttpTimeout);

			// Сообщим серверу об ошибке во время загруке, сервер сможет удалить уже загруженные части.
			// XMLHttpRequest, метод GET,  PHP скрипт тот-же.
			var gxhr = new XMLHttpRequest();

			gxhr.open('GET', that.options['uploadscript']+'?action=abort', true);

			// Установим идентификатор загруки.
			gxhr.setRequestHeader("Upload-Id", that.options['uploadid']);

			/*
			* Событие XMLHttpRequest.onLoad. Окончание загрузки сообщения об ошибке загрузки :).
			* @param evt Событие
			*/
			gxhr.addEventListener("load", function(evt) {

				// Если сервер не вернул HTTP статус 200, то выведем окно с сообщением сервера.
				if (evt.target.status!=200) {
					alert(evt.target.responseText);
					return;
					}
				}, false);

			// Отправим HTTP GET запрос
			gxhr.sendAsBinary('');
			
			if (typeof(that.options['onBreak']) == "function") 
				that.options['onBreak'](that);
	}


	/*
	* Загрузка части файла на сервер
	* @param from Позиция, с которой будем загружать файл
	*/
    this.UploadPortion=function(from) {

			// Объект FileReader, в него будем считывать часть загружаемого файла
			var reader = new FileReader();
			

			// Текущий объект
			var that=this;

			// Позиция с которой будем загружать файл
			var loadfrom=from;

			// Объект Blob, для частичного считывания файла
			var blob=null;

			// Таймаут для функции setTimeout. С помощью этой функции реализована повторная попытка загрузки 
			// по таймауту (что не совсем корректно)
			var xhrHttpTimeout=null;

			/*
			* Событие срабатывающее после чтения части файла в FileReader
			* @param evt Событие
			*/
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {

					// Создадим объект XMLHttpRequest, установим адрес скрипта для POST
					// и необходимые заголовки HTTP запроса.
					var xhr = new XMLHttpRequest();
					xhr.open('POST', that.options['uploadscript'], true);
					xhr.setRequestHeader("Content-Type", "application/x-binary; charset=x-user-defined");

					// Идентификатор загрузки (чтобы знать на стороне сервера что с чем склеивать)
					xhr.setRequestHeader("Upload-Id", that.options['uploadid']);
					// Позиция начала в файле
					xhr.setRequestHeader("Portion-From", from);
					// Размер порции
					xhr.setRequestHeader("Portion-Size", that.options['portion']);

					// Установим таймаут
					that.xhrHttpTimeout=setTimeout(function() {
						xhr.abort();
						},that.options['timeout']);

					/*
					* Событие XMLHttpRequest.onProcess. Отрисовка ProgressBar.
					* @param evt Событие
					*/
					xhr.upload.addEventListener("progress", function(evt) {
						if (evt.lengthComputable) {

							// Посчитаем количество закаченного в процентах (с точность до 0.1)
							var percentComplete = Math.round((loadfrom+evt.loaded) * 1000 / that.filesize);percentComplete/=10;
				
							if (typeof(that.options['onProgress']) == "function") {
							
								if( that.options['onProgress'](that, percentComplete)=='break' ){
									that.BreakUpload=true;
								};
							}
					
						}
						
						}, false);



				/*
				* Событие XMLHttpRequest.onLoad. Окончание загрузки порции.
				* @param evt Событие
				*/
                xhr.addEventListener("load", function(evt) {

					// Очистим таймаут
                    clearTimeout(that.xhrHttpTimeout);

					// Если сервер не вернул HTTP статус 200, то выведем окно с сообщением сервера.
                    if (evt.target.status!=200) {
                        alert(evt.target.responseText);
                        return;
                        }

					// Добавим к текущей позиции размер порции.
                    that.position+=that.options['portion'];

					// Закачаем следующую порцию, если файл еще не кончился.
                    if (that.filesize>that.position) {
						if(that.BreakUpload==true){
							that.BreakUploadFunc();
						}else{
							that.UploadPortion(that.position);
						}
                        }
                    else {
						// Если все порции загружены, сообщим об этом серверу. XMLHttpRequest, метод GET, 
						// PHP скрипт тот-же.
                        var gxhr = new XMLHttpRequest();
                        gxhr.open('GET', that.options['uploadscript']+'?action=done&originalname='+that.file.name, true);

						// Установим идентификатор загруки.
                        gxhr.setRequestHeader("Upload-Id", that.options['uploadid']);

						/*
						* Событие XMLHttpRequest.onLoad. Окончание загрузки сообщения об окончании загрузки файла :).
						* @param evt Событие
						*/
                        gxhr.addEventListener("load", function(evt) {

							// Если сервер не вернул HTTP статус 200, то выведем окно с сообщением сервера.
                            if (evt.target.status!=200) {
                                alert(evt.target.responseText.toString());
                                return;
                                }
							// Если все нормально, то отправим пользователя дальше. Там может быть сообщение
							// об успешной загрузке или следующий шаг формы с дополнительным полями.
                            else 
								if (typeof(that.options['onSuccess']) == "function") 
									that.options['onSuccess'](that);
                            }, false);

						// Отправим HTTP GET запрос
                        gxhr.sendAsBinary('');
                        }
                    }, false);

					
					
				/*
				* Событие XMLHttpRequest.onError. Ошибка при загрузке
				* @param evt Событие
				*/
                xhr.addEventListener("error", function(evt) {

					// Очистим таймаут
                    clearTimeout(that.xhrHttpTimeout);

					// Сообщим серверу об ошибке во время загруке, сервер сможет удалить уже загруженные части.
					// XMLHttpRequest, метод GET,  PHP скрипт тот-же.
                    var gxhr = new XMLHttpRequest();

                    gxhr.open('GET', that.options['uploadscript']+'?action=abort', true);

					// Установим идентификатор загруки.
                    gxhr.setRequestHeader("Upload-Id", that.options['uploadid']);

					/*
					* Событие XMLHttpRequest.onLoad. Окончание загрузки сообщения об ошибке загрузки :).
					* @param evt Событие
					*/
                    gxhr.addEventListener("load", function(evt) {

						// Если сервер не вернул HTTP статус 200, то выведем окно с сообщением сервера.
                        if (evt.target.status!=200) {
                            alert(evt.target.responseText);
                            return;
                            }
                        }, false);

					// Отправим HTTP GET запрос
                    gxhr.sendAsBinary('');

					// Отобразим сообщение об ошибке
                    if (that.options['message_error']==undefined) alert("There was an error attempting to upload the file."); else alert(that.options['message_error']);
                    }, false);

				/*
				* Событие XMLHttpRequest.onAbort. Если по какой-то причине передача прервана, повторим попытку.
				* @param evt Событие
				*/
                xhr.addEventListener("abort", function(evt) {
                    clearTimeout(that.xhrHttpTimeout);
                    that.UploadPortion(that.position);
                    }, false);

				// Отправим порцию методом POST
                xhr.sendAsBinary(evt.target.result);
                }
            };

			that.blob=null;

			// Считаем порцию в объект Blob. Три условия для трех возможных определений Blob.[.*]slice().
			if (this.file.slice) that.blob=this.file.slice(from,from+that.options['portion']);
			else {
				if (this.file.webkitSlice) that.blob=this.file.webkitSlice(from,from+that.options['portion']);
				else {
					if (this.file.mozSlice) that.blob=this.file.mozSlice(from,from+that.options['portion']);
					}
				}

			// Считаем Blob (часть файла) в FileReader
			reader.readAsBinaryString(that.blob);
        }


	/*
	* Загрузка файла на сервер
	* return Число. Если не 0, то произошла ошибка
	*/
    this.Upload=function(file, filesize) {
			if (this.CheckBrowser()) {
				this.BreakUpload=false;
				this.filesize=filesize;
				this.file=file;

				if (!this.file) return -1;
				else {

					// Если размер файла больше размера порциии ограничимся одной порцией
					if (this.filesize>this.options['portion']) this.UploadPortion(0,this.options['portion']);

					// Иначе отправим файл целиком
					else this.UploadPortion(0,this.filesize);
					}
			}else{
				return -1;
			}
		}



    if (this.CheckBrowser()) {

		// Установим значения по умолчанию
        if (this.options['portion']==undefined) this.options['portion']=1048576;
        if (this.options['timeout']==undefined) this.options['timeout']=15000;

    }
}