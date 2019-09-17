import _ from 'lodash';

const tab = '  ';
const tabStep = 2;

const handler = (element, indent) => {
  if (!_.isObject(element)) {
    return element;
  }

  const func = ([key, value]) => `{\n${indent}${tab.repeat(3)}${key}: ${value}\n${indent}${tab}}`;
  return Object.entries(element).map(func);
};

const render = (diff, tabCount) => {
  const func = ({
    type,
    key,
    removedValue,
    currentValue,
  }) => {
    const indent = tab.repeat(tabCount);

    const types = {
      nested: () => `${indent}${tab}${key}: {\n${render(currentValue, tabCount + tabStep)}\n${indent}${tab}}`,
      equal: () => `${indent}${tab}${key}: ${handler(currentValue, indent)}`,
      added: () => `${indent}+ ${key}: ${handler(currentValue, indent)}`,
      removed: () => `${indent}- ${key}: ${handler(removedValue, indent)}`,
      changed: () => `${indent}+ ${key}: ${handler(currentValue, indent)}\n${indent}- ${key}: ${handler(removedValue, indent)}`,
    };

    return types[type]();
  };

  return _.flatten(diff.map(func)).join('\n');
};

export default (diff) => `{\n${render(diff, 1)}\n}`;
