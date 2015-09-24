var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var directoryLocation = process.cwd();
var postlink = require('./postlink/index.js');
var moduleFolders;
var sourceFolder = String(child_process.execSync('npm config get postlink_path')).slice(0, -1);

if( process.argv[2] ){
	moduleFolders = [path.resolve(directoryLocation, process.argv[2])];
}
else{
	moduleFolders = fs.readdirSync(directoryLocation).map(function(fileName){
		return path.join(directoryLocation, fileName);
	}).filter(function(moduleFolderLocation){
		return fs.existsSync(path.join(moduleFolderLocation, 'package.json'));
	});
}

moduleFolders.forEach(function(moduleFolder){
	postlink(moduleFolder, sourceFolder);
});