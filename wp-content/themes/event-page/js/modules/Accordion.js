const Accordion = class {
    constructor(el) {
        this.accordions = el;

        this._init_events();
    }

    _init_events() {
        this.accordions.on('click', this.accordion_click.bind(this));
    }

    accordion_click(e) {
        $(e.currentTarget).parent().toggleClass('open');
        $(e.currentTarget).siblings('.accordion__content').slideToggle(400);
    }
};

export default Accordion;