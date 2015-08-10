var Calculatormodule = angular.module("SeqCalcmoduleapp", ['ngResource']);

Calculatormodule.controller("SeqCalcController", function ($scope) {
    $scope.states = false;
    $scope.digits = {};
    $scope.collapsenumbers = true;
    $scope.collapseoddnumbers = true;
    $scope.collapseevennumbers = true;
    $scope.collapsecustomnumbers = true;
    $scope.collapsefibnoccinumbers = true;
           
   // logic to show and hide instructions...!!
    $scope.Instructionstatus = function () {
        $scope.states = !($scope.states)
    };

    $scope.sequence = {
        state:false
    };

    //Generating all Numeric sequences like even, odd, custom, and fibonacci..!! 
    $scope.GenerateSequence = function () {

        // Actual logic for generating sequences.
        //  for all, even, and odd number sequence

        $scope.sequence.state = true;
        var maxvalue = $scope.inputvalue;
        var range = [];
        $scope.range = [];
        for (i = 0; i <= maxvalue; i++) {
            range.push(i);
        }
        $scope.arraylist = range;
        
        // Logic for all custom numbers...!!    

        angular.forEach($scope.arraylist, function (val, key) {
            if (val !== 0) {
                if (val % 3 == 0) {
                    $scope.arraylist[val] = 'C';
                }
                if (val % 5 == 0) {
                    $scope.arraylist[val] = 'E';
                }
                if ((val % 3 == 0) && (val % 5 == 0)) {
                    $scope.arraylist[val] = 'Z';
                }
            }

        });

        //logic for all,even, and odd numeric sequences..!!

        var allnumberscount = $scope.inputvalue;
        var allnumbers = [];
        $scope.allnumbers = [];
        for (var j = 0; j < allnumberscount; j++) {
            allnumbers.push(j);
        }
        $scope.allnumbers = allnumbers;


       // Logic for all fibonacci numbers..!!

        $scope.fibarray = [];
        var fibonacci = [];
        var a = 0, b = 1, result=0, n = maxvalue;
        for (var i = 2; result <= n; i++){
            result = a + b;
            a = b;
            b = result;
            if (result <= n) {
                fibonacci.push(result);
            }
            
        }
        $scope.fibarray = fibonacci;
                  
    };            

    // Code for disabling generate button untill the input value is whole number..!!
    $scope.disabled = function () {
        if (isNaN($scope.inputvalue)) { return true }
        else
        { return false }
    };                    
    
});

