export default class WebAnnotation {

  constructor(annotation) {
    this._annotation = annotation;
  }

  /** Creates a copy of this annotation **/
  clone() {
    return new WebAnnotation(Object.assign({}, this._annotation));
  }

  /** An equality check based on the underlying object **/
  isEqual(other) {
    return other ? this._annotation === other._annotation : false;
  }

  /*************************************/ 
  /* Getters to forward properties of  */
  /* the underlying annotation         */
  /*************************************/

  get id() {
    return this._annotation.id; 
  }

  get type() {
    return this._annotation.type;
  }

  get body() {
    return this._annotation.body;
  }

  get target() {
    return this._annotation.target;
  }

  /** Same as .body, but guaranteed to return an array **/
  get bodies() {
    return (Array.isArray(this._annotation.body)) ?
      this._annotation.body : [ this._annotation.body ];
  }

  /** Only bodies are meant to be mutated by the application **/
  set bodies(bodies) {
    this._annotation.body = bodies;
  }

  /*****************************************/ 
  /* Various access helpers and shorthands */
  /*****************************************/

  /** Selector of the given type **/
  selector = type => {
    return this._annotation.target.selector.find(t => t.type === type);
  }

  /** Shorthand for the 'exact' field of the TextQuoteSelector **/
  get quote() {
    return this.selector('TextQuoteSelector').exact;
  }

  /** Shorthand for the 'start' field of the TextPositionSelector **/
  get start() {
    return this.selector('TextPositionSelector').start;
  }

  /** Shorthand for the 'end' field of the TextPositionSelector **/
  get end() {
    return this.selector('TextPositionSelector').end;
  }
  
}