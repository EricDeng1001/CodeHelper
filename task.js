const fs = require("fs");
const commander = require("commander");
const version = "0.1";
const Checker = require("./Checker");
const checker = new Checker();

commander
  .version( version )
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName, ( err, stats ) => {
      if( err ){
        console.log( err.message );
      } else {
        checker.checkStats( projectName ).then(
          () => {
            console.log( "total lines:", checker.lines );
            console.log( "total words(ascii):", checker.words );
          }
        );

      }
    })
  })
  .parse( process.argv );
