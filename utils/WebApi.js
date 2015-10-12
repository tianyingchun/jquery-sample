import URI from './URI';
import PATH from '../shared/react/utils/path';
import STRING from '../shared/react/utils/string';

class WebAPI {
  // PATH related utitlites.
  getApiUrl (path, query) {
    let finalPath = 'http://localhost:5000';
    finalPath = STRING.stringFormat('{0}{1}', finalPath, PATH.normalizePath(path));
    if (query) {
      let queryPath = [];
      Object.keys(query).forEach((key) => {
        queryPath.push(`${key}=${query[key]}`);
      });
      return finalPath + '?' + queryPath.join('&').replace(/^&+/, '');
    } else {
      return finalPath;
    }
  }
}
export default WebAPI;
