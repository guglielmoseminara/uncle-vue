import { BaseElement } from '../../index';

export default class Field extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        this.parentEl = parentEl;
        this.name = fieldName;
        if (parentEl.tagName == 'field') {
            this.fieldEl = this.parser.getNestedField(parentEl, fieldName);
        } else {
            this.fieldEl = this.parser.getElementFieldStrict(parentEl, fieldName);
        }
        const languageProvider = this.serviceManager.getLanguageProvider();
        const textAttribute = this.parser.getAttribute(this.fieldEl, 'text');
        const placeholderAttribute = this.parser.getAttribute(this.fieldEl, 'placeholder');
        const limitAttribute = this.parser.getAttribute(this.fieldEl, 'limit');
        this.text = textAttribute != null ? languageProvider.parse(textAttribute) : (languageProvider.parse(this.parser.getElementText(this.fieldEl)) || '');
        this.type = this.parser.getAttribute(this.fieldEl, 'type');
        this.validator = this.parser.getAttribute(this.fieldEl, 'validator');
        this.value = this.parser.getAttribute(this.fieldEl, 'value');
        this.bind = this.parser.getAttribute(this.fieldEl, 'bind');
        this.sortable = this.parser.getAttribute(this.fieldEl, 'sortable') || false;
        this.disabled = this.parser.getAttribute(this.fieldEl, 'disabled') == 'true' || false;
        this.widget = this.parser.getAttribute(this.fieldEl, 'widget');
        this.format = this.parser.getAttribute(this.fieldEl, 'format');
        this.placeholder = placeholderAttribute ? languageProvider.parse(placeholderAttribute) : null;
        this.limit = limitAttribute ? parseInt(limitAttribute) : false;
        this.icon = this.parser.getAttribute(this.fieldEl, 'icon');
        this.alias = this.parser.getAttribute(this.fieldEl, 'alias');
        this.objProperty = this.parser.getAttribute(this.fieldEl, 'obj-property');
        this.watch = this.parser.getAttribute(this.fieldEl, 'watch');
        this.disableLabel =  this.parser.getAttribute(this.fieldEl, 'disable-label') == 'true';
        this.symbol = this.parser.getAttribute(this.fieldEl, 'symbol') || '';
        this.formatter = this.parser.getElementFormatter(this.fieldEl) ? this.builder.getFieldFormatter(this.fieldEl) : null;
        return this;
    }

    getFields() {
        if (this.fields) {
            return this.fields;
        } else if (this.fieldEl){
            const fields = this.parser.getNestedFields(this.fieldEl);
            this.fields = Array.from(fields).map((field) => {
                return this.builder.getField(this.fieldEl, this.parser.getAttribute(field, 'name'));
            });
            return this.fields;    
        }
    }

    getForm() {
        if (this.form) {
            return this.form;
        } else {
            if (this.fieldEl) {
                const formEl = this.parser.getParentForm(this.fieldEl);
                return this.builder.getForm(this.parser.getAttribute(formEl, 'name'));        
            }
        }
    }

    getLabel() {
        this.label = null;
        if (this.fieldEl) {
            const label = this.parser.getElementLabel(this.fieldEl);
            if (label) {
                this.label = this.builder.getLabel(this.fieldEl);
            }
            return this.label;    
        }
    }

    getDefault() {
        return null;
    }

} 