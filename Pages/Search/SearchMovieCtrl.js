app.controller("SearchMovieCtrl", ["$scope", "$rootScope", "$http", "$window", "$timeout" ,"$routeParams", function ($scope, $rootScope, $http, $window, $timeout, $routeParams) {
    //-------------------------------------------------- Biến môi trường
    $scope.type = $routeParams.type;
    $scope.value = $routeParams.value;
    $scope.listMovie = [];
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Biến môi trường
    
    
    //-------------------------------------------------- Xử lí tiện ích
    $scope.getMovieByIdLoai = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/byTheLoai/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành công
                $scope.listMovie = response.data.result;
                $scope.getDetailCategory($scope.value);
            },
            function errorCallback(response) { 			// Nếu thất bại
               console.log(response);
            }
        )
    }

    $scope.getDetailCategory = async function (id) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `theloai/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.value = response.data.result.tenLoai;
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }

    $scope.searchKeyWord = async function (value) {
        await $http({
            method: 'GET',
            url: $rootScope.Host + `phim/search`,
            params: {'keyword': value},
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function successCallback(response){			// Nếu thành 
                $scope.listMovie = response.data.result;
            },
            function errorCallback(response) { 			// Nếu thất bại
            }
        )
    }
    if($scope.type == 'category'){
        $scope.getMovieByIdLoai($scope.value);
    }else{
        $scope.searchKeyWord($scope.value);
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Xử lí tiện ích
}]);