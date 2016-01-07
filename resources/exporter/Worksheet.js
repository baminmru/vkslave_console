/**
 * @class Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Worksheet = Ext.extend(Object, {

    constructor: function (store, config) {
        config = config || {};

        this.store = store;

        Ext.applyIf(config, {
            hasTitle: true,
            hasHeadings: true,
            stripeRows: false,
            title: "Workbook",
            columns: store.fields == undefined ? {} : store.fields.items
        });

        Ext.apply(this, config);

        Worksheet.superclass.constructor.apply(this, arguments);
    },

    /**
    * @property dateFormatString
    * @type String
    * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
    */
    dateFormatString: "d.m.Y",
    xlRows: 0,

    worksheetTpl: new Ext.XTemplate(
    '<ss:Worksheet ss:Name="Data">',
      '<ss:Names>',
        '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',
      '</ss:Names>',
      '<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',
        '{columns}',
        '<ss:Row ss:Height="38">',
            '<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">',
              '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">',
                '<html:B><html:U><html:Font html:Size="15">{title}',
                '</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',
            '</ss:Cell>',
        '</ss:Row>',
        '<ss:Row ss:AutoFitHeight="1">',
          '{header}',
        '</ss:Row>',
        '{rows}',
      '</ss:Table>',
      '<x:WorksheetOptions>',
        '<x:PageSetup>',
          '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />',
          '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />',
          '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',
        '</x:PageSetup>',
        '<x:FitToPage />',
        '<x:Print>',
          '<x:PrintErrors>Blank</x:PrintErrors>',
          '<x:FitWidth>1</x:FitWidth>',
          '<x:FitHeight>32767</x:FitHeight>',
          '<x:ValidPrinterInfo />',
          '<x:VerticalResolution>600</x:VerticalResolution>',
        '</x:Print>',
        '<x:Selected />',
        '<x:DoNotDisplayGridlines />',
        '<x:ProtectObjects>False</x:ProtectObjects>',
        '<x:ProtectScenarios>False</x:ProtectScenarios>',
      '</x:WorksheetOptions>',
    '</ss:Worksheet>'
  ),

    /**
    * Builds the Worksheet XML
    * @param {Ext.data.Store} store The store to build from
    */
    render: function (store) {
        return this.worksheetTpl.apply({
            header: this.buildHeader(),
            columns: this.buildColumns().join(""),
            rows: this.buildRows().join(""),
            colCount: this.columns.length,
            rowCount: this.buildRowCount() + 2,
            title: this.title
        });
    },

    buildRowCount: function () {
        //this.store.getCount()
        return xlRows;
    },
    buildColumns: function () {
        var cols = [];

        Ext.each(this.columns, function (column) {
			var cwidth=100;
			if(column.width !=undefined){
				cwidth=column.width/2;
			}
            cols.push(this.buildColumn(cwidth));
        }, this);

        return cols;
    },

    buildColumn: function (width) {
        return Ext.String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />', width || 100);
    },


    buildTreeRows: function (rows, Node) {
        var childNodes = Node.childNodes,
	length = childNodes.length,
	j;

        for (j = 0; j < length; j++) {
            rows.push(this.buildTreeRow(childNodes[j].data, rows.length));
            this.buildTreeRows(rows, childNodes[j]);
        }


        return rows;
    },
    buildRows: function () {
        var rows = [];
        try {
            this.store.each(function (record, index) {
                rows.push(this.buildRow(record, index));
            }, this);
            xlRows = this.store.getCount();
        } catch (err) {
            this.buildTreeRows(rows, this.store.getRootNode())
            xlRows = rows.length;
        }

        return rows;
    },



    buildHeader: function () {
        var cells = [];
		var cwidth=30;
        Ext.each(this.columns, function (col) {
            var title;

            if (col.text != undefined) {
                title = col.text;
            } else {
                //make columns taken from Record fields (e.g. with a col.name) human-readable
                title = col.dataIndex.replace(/_/g, " ");
                title = title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
            }
			if(col.width != undefined){
				cwidth=col.width;
			}

            cells.push(Ext.String.format('<ss:Cell ss:StyleID="headercell" ><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>', title));
        }, this);

        return cells.join("");
    },

    buildRow: function (record, index) {
        var style,
        cells = [];
		
        if (this.stripeRows === true) 
			style = index % 2 == 0 ? 'even' : 'odd';
		else
			style="none";

        Ext.each(this.columns, function (col) {
			
            try {
                var name = col.dataIndex;

                //if given a renderer via a ColumnModel, use it and ensure data type is set to String
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record.get(name), null, record),
				type = "String";
                } else {
                    var value = record.get(name),
				type = this.typeMappings[col.type || record.getField(name).type];
                }
				
				

                cells.push(this.buildCell(value, type, style,col).render());
            } catch (err) {
                type = "String";
                cells.push(this.buildCell("", type, style,col).render());
            }
        }, this);

        return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
    },


    buildTreeRow: function (record, index) {
		
        var style,
        cells = [];
        if (this.stripeRows === true) 
			style = index % 2 == 0 ? 'even' : 'odd';
		else
			style="none";

        Ext.each(this.columns, function (col) {
			
            try {
                var name = col.dataIndex;

                //if given a renderer via a ColumnModel, use it and ensure data type is set to String
                if (Ext.isFunction(col.renderer)) {
                    var value = col.renderer(record[name], null, record),
					type = "String";
                } else {
                    var value = record[name],
					type = this.typeMappings[col.type];
                }
			
                cells.push(this.buildCell(value, type, style,col).render());
            } catch (err) {
                type = "String";
                cells.push(this.buildCell(record[name], type, style, col).render());
            }
        }, this);

        return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
    },

    buildCell: function (value, type, style,col) {
        if (type == "DateTime") {
			
			style="tcell";
		
			if(col.format !=undefined){
				if(col.format=='d.m.Y H'){
					style="hcell";
				}
				if(col.format=='d.m.Y'){
					style="dcell";
				}
			}
		
			
            if (Ext.isDate(value)) {
                
				value =  value.toLocaleFormat('%Y-%m-%dT%H:%M:%S');
            } else {
                dvalue = new Date(value);
                if (Ext.isDate(dvalue)) {
					value =  dvalue.toLocaleFormat('%Y-%m-%dT%H:%M:%S');
                } else {
                    if (Ext.isFunction(value.format)) { value = value.format(this.dateFormatString); }
					//type = "String";
                }
            }
            
        }
		if (type == "Number") {
			console.log(value + "-->" + value.toFixed(3));
			return new Cell({
				value: value.toFixed(3),
				type: type,
				style: style
			});
		}else{

			return new Cell({
				value: value,
				type: type,
				style: style
			});
		}
    },

    /**
    * @property typeMappings
    * @type Object
    * Mappings from Ext.data.Record types to Excel types
    */
    typeMappings: {
		'number': "Number",
        'int': "Number",
        'string': "String",
        'float': "Number",
        'date': "DateTime"

    }
});