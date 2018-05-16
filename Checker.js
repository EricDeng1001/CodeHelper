const fs = require("fs");
class Checker {
  constructor(){
    this.lines = 0;
    this.words = 0;
    this.sumStatus = this.sumStatus.bind( this );
  }

  checkStats( path ){
    return this.__checkStats( path )
      .then( this.sumStatus )
    ;
  }

  __checkStats( path ){
    return new Promise( ( resolve, reject ) => {
      fs.stat( path, ( err, stats ) => {
        if( stats.isFile() ){
          fs.readFile( path, ( err, data ) => {
            resolve( data.toString() );
          });
        } else if( stats.isDirectory() ){
          fs.readdir( path, ( err, files ) => {
            let promises = [];
            for( let file of files ){
              promises.push(
                this.__checkStats( path + "/" + file )
                  .then( this.sumStatus )
              );
            }
            Promise.all( promises ).then( () => resolve("") );
          })
        }
      })
    });
  }

  sumStatus( string ){
    let newLines = this.analysis( string );
    this.lines += newLines
    this.words += string.length - newLines;
  }

  analysis( string ){
    var res = 0;

    for( let i = string.length - 1; i >= 0; i-- ){
      switch( string.charCodeAt( i ) ){
        case 13:
        case 10:
          res++;
          break;
      }
    }

    return res;
  }
};

module.exports = Checker;
