angular.module('currencyConverterApp', [])
.controller('CurrencyConverterController', ['$scope', '$http', function($scope, $http) {
    $scope.currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR']; // Updated currencies with INR
    $scope.fromCurrency = 'USD'; // Default from currency
    $scope.toCurrency = 'EUR'; // Default to currency
    $scope.amount = 1; // Default amount

    $scope.convert = function() {
        var apiUrl = 'https://api.exchangerate-api.com/v4/latest/' + $scope.fromCurrency;

        $http.get(apiUrl)
        .then(function(response) {
            var rate = response.data.rates[$scope.toCurrency];
            $scope.result = ($scope.amount * rate).toFixed(2)+` ${$scope.toCurrency}`;
        })
        .catch(function(error) {
            console.error('Error fetching currency conversion data:', error);
            $scope.result = 'Error';
        });
    };
}]);
