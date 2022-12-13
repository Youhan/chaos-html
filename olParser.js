
	//Override jade parser
	var olParser = require('jade').Parser;

	olParser.prototype.resolvePath = function(path, purpose) {
		var p = require('path');
	    var fs=require('fs');
	    var dirname = p.dirname;
	    var basename = p.basename;
	    var join = p.join;
	    var sep=p.sep;

	    if (path[0] !== '/' && !this.filename)
	      throw new Error('the "filename" option is required to use "' + purpose + '" with "relative" paths');

	    if (path[0] === '/' && !this.options.basedir)
	      throw new Error('the "basedir" option is required to use "' + purpose + '" with "absolute" paths');


	    if (basename(path).indexOf('.') == -1)
	        path += '.jade'


	    if (path[0] == '/'){
	      //Absolute path

	      var relbase=join(this.options.basedir,this.options.target);
	      path=fs.existsSync(join(relbase,path))?join(relbase,path):join(this.options.basedir,path);
	    }else{
	      //Relative path

	      path = join(dirname(this.filename), path);
	      
	      //Always check local folder then global
	      var pathArray=path.split(sep);
	      var targetIdx=pathArray.indexOf(this.options.target);
	      if (targetIdx>-1){
	        //target is local
	        pathArray.splice(targetIdx,1);
	        var newPath='';
	        pathArray.forEach(function(entry) {
			    newPath=join(newPath,entry);
			});
	        path=fs.existsSync(path)?path:newPath;
	      }else{
	        //target is global 
	        var temp=join(this.options.basedir,this.options.target,path.split(this.options.basedir)[1]);
	        path=fs.existsSync(temp)?temp:path;
	       
	      }
	      

	    }
	    return path;
	}

module.exports = olParser;