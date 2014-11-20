(function() {
  // Get any jquery=___ param from the query string.
  var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
  var paths = [];
  var pathsCss = [];
  if (jqversion) {
    // A version was specified, load that version from code.jquery.com.
    paths.push('https://code.jquery.com/jquery-' + jqversion[1] + '.js');
  } else {
    // No version was specified, load the local version.
    paths.push('../test/libs/jquery/jquery.js');
  }

  // Get any jquery-ui=___ param from the query string.
  var jquiversion = location.search.match(/[?&]jquery-ui=(.*?)(?=&|$)/);
  if (jquiversion) {
    // A version was specified, load that version from code.jquery.com.
    paths.push('https://code.jquery.com/ui/' + jquiversion[1] + '/jquery-ui.js');
    pathsCss.push('https://code.jquery.com/ui/' + jquiversion[1] + '/themes/base/jquery-ui.css');
  } else {
    // No version was specified, load the local version.
    paths.push('../test/libs/jquery-ui/jquery-ui.js');
    pathsCss.push('../test/libs/jquery-ui/themes/base/jquery-ui.css');
  }

  // We aggregate all the scripts and stylesheets code in a string
  var scripts = '';
  for (var i in paths) {
    scripts += '<script src="' + paths[i] + '"></script>';
  }

  var stylesheets = '';
  for (var j in pathsCss) {
    stylesheets += '<link rel="stylesheet" href="' + pathsCss[j] + '" media="screen">';
  }

  // This is the only time I'll ever use document.write, I promise!
  document.write(scripts + stylesheets);
}());
