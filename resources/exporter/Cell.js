/**
 * @class Cell
 * @extends Object
 * Represents a single cell in a worksheet
 */
Cell = Ext.extend(Object, {

  constructor: function(config) {
    Ext.applyIf(config, {
      type: "String"
    });
    
    Ext.apply(this, config);
    
    Cell.superclass.constructor.apply(this, arguments);
  },
  
  render: function() {
    return this.tpl.apply(this);
  },
  
  tpl: new Ext.XTemplate(
    '<ss:Cell ss:StyleID="{style}" >',
      '<ss:Data ss:Type="{type}"><![CDATA[{value}]]></ss:Data>',
    '</ss:Cell>'
  )
});