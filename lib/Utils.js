const { List, Set, Map, fromJS } = require('Immutable');

class Utils {
  static getReadableStr(arr = []) {
    if (!arr.length) {
      throw new Error('Cannot reduce an empty array');
    }
    return `${new Set(arr).join('. ')}.`;
  }

  // NOTE the below two functions are the crux of the tests in
  // initial.test.js so testing them would be moot

  static getMessages(data) {
    if (List.isList(data) && typeof data.get(0) === 'string') {
      return data;
    }

    if (!Map.isMap(data) && !List.isList(data)) {
      throw new Error('Data must be either an Immutable List or Map');
    }

    return data.map((value) => Utils.getMessages(
      fromJS(value))
    ).toList().flatten();
  }

  static replaceMessages(data) {
    if (List.isList(data) && typeof data.get(0) === 'string') {
      return Utils.getReadableStr(data.toArray());
    }

    if (!Map.isMap(data) && !List.isList(data)) {
      throw new Error('Data must be either an Immutable List or Map');
    }

    return data.map((value) => Utils.replaceMessages(
      fromJS(value))
    );
  }
}

module.exports = Utils;
