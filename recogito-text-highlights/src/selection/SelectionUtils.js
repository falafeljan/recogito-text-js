import TextAnnotation from "../annotation/text/TextAnnotation";

export const trimRange = range => {
  let quote = range.toString();
  let leadingSpaces = 0;
  let trailingSpaces = 0;

  // Count/strip leading spaces
  while (quote.substring(0, 1) === ' ') {
    leadingSpaces += 1;
    quote = quote.substring(1);
  }

  // Count/strip trailing spaces
  while (quote.substring(quote.length - 1) === ' ') {
    trailingSpaces += 1;
    quote = quote.substring(0, quote.length - 1);
  }

  // Adjust range
  if (leadingSpaces > 0)
    range.setStart(range.startContainer, range.startOffset + leadingSpaces);

  if (trailingSpaces > 0)
    range.setEnd(range.endContainer, range.endOffset - trailingSpaces);

  return range;
}

export const rangeToAnnotationStub = (range, containerEl) => {
  const rangeBefore = document.createRange();

  // A helper range from the start of the contentNode to the start of the selection
  rangeBefore.setStart(containerEl, 0);
  rangeBefore.setEnd(range.startContainer, range.startOffset);

  const quote = range.toString();
  const start = rangeBefore.toString().length;

  return new TextAnnotation({ 
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    'type': 'Annotation',
    'body': [{
      'type': 'TextualBody'
    }],
    'target': {
      'selector': [{
        'type': 'TextQuoteSelector',
        'exact': quote
      }, {
        'type': 'TextPositionSelector',
        'start': start,
        'end': start + quote.length
      }]
    }
  });
};