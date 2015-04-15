function Item(text, callback) {
    this.text = text;
    this.work = function() {callback(this);};
}