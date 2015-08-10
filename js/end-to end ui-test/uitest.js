phantom.casperTest = true;
var casper = require('casper').create();

casper.test.begin('uitest started:', function (test) {
    casper.start('~/Main.html', function () {
        this.echo('\n');
        this.echo('Check all UI elements are initialized correctly');
        this.echo('-----------------------------------------------');

        // Instructions button exists, visible, and labled as "Instructions"
        test.assertExist('.container .instructions', 'Instructions button exists');
        test.assertVisible('.container .instructions', 'Instructions button visible');
        test.assertMatch(this.getHTML('.container .instructions').toString(), /Instructions/g, 'Instructions button labled as Instructions');

        // Input textbox exists, and visible
        test.assertExist('.input-group #user__input', 'Input box exists');
        test.assertVisible('.input-group #user__input', 'Input box visible');

        // Generate sequence button exists, and visible
        test.assertExist('.input-group .btn-default', 'Generate button exists');
        test.assertVisible('.input-group .btn-default', 'Generate button visible');
        //test.assertMatch(this.getElementAttribute('.input__container .btn-default', 'disabled'), /disabled/, 'Generate button is disabled by default');

        // Error container exists, and not visible
        test.assertExist('.statuscontainer .danger', 'Error container exists');
        test.assertNotVisible('.statuscontainer .danger', 'Error container not visible');

        // Results container exists, and visible
        test.assertExist('.Results-container', 'Output box exists');
        test.assertNotVisible('.Results-container', 'Output box not visible');
    });

    casper.then(function () {
        this.sendKeys('.input-group #user__input', '');
    });

    casper.thenClick('.input-group .btn-default', function () {
        this.echo('\n');
        this.echo('Check for error message on invalid input');
        this.echo('----------------------------------------');
        this.test.assertVisible('.danger', 'Error message is displayed for invalid input');
    });

    casper.then(function () {
        this.sendKeys('.input-group #user__input', '100000');
    });

    casper.thenClick('.input-group .btn-default', function () {
        this.echo('\n');
        this.echo('Check output for numbers less than or equal 100000');
        this.echo('--------------------------------------------------------');
        this.test.assertVisible('.output-container', 'Output container is visible for input less than or equal to 100000');
    });

    casper.then(function () {
        this.sendKeys('.input-group #user__input', '200001');
    });

    casper.thenClick('.input-group .btn-default', function () {
        this.echo('\n');
        this.echo('Check output for numbers greater than 100000 i.e. paginated result -- First Page');
        this.echo('------------------------------------------------------------------');
        //this.echo(this.getHTML('.status__container .info__container'));
        this.test.assertVisible('.output-container', 'Output container is visible for input more than 100000');
    });

    casper.thenClick('.input-group .btn-default', function () {
        this.echo('\n');
        this.echo('Check output when the input is positive whole number, by clicking generate button');
        this.echo('------------------------------------------------------------------');
        this.test.assertVisible('.input-group .btn-default', 'Generate button is visible for clicking');
        this.test.assertNotEquals(this.getElementAttribute('.input-group .btn-default', 'disabled'), 'disabled', 'disabled when the input is not a positive whole number');
        this.test.assertVisible('.panel-container', 'Output panel container is visible for the results');
    });

    // Test cases for "Instructions" functionality
    casper.thenClick('.container .instructions', function () {
        this.echo('\n');
        this.echo('Test the functionalities around Instructions');
        this.echo('--------------------------------------------');
        this.test.assertMatch(this.getHTML('.container .instructions .content h3'), /^Instructions$/g, 'The box contains instructions on how to use the application.');
        this.test.assertVisible('.container .instructions ,close', 'The instruction box will close the instructions by the button.');
        this.thenClick('.container .instructions .box--close', function () {
            this.test.assertNotVisible('.container .instructions', 'Clicking the instruction button again closes the container.');
        });
    });

    casper.run(function () {
        this.test.done();
        this.test.renderResults(true);
    });
});