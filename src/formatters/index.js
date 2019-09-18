import prettyRender from './prettyRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const formatters = {
  pretty: prettyRender,
  plain: plainRender,
  json: jsonRender,
};

export default (ast, format) => formatters[format](ast);
