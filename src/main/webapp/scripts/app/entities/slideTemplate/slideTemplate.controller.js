'use strict';

angular.module('securityratApp')
    .controller('SlideTemplateController', function ($scope, SlideTemplate, SlideTemplateSearch) {
        $scope.slideTemplates = [];
        $scope.loadAll = function() {
            SlideTemplate.query(function(result) {
               $scope.slideTemplates = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            SlideTemplate.get({id: id}, function(result) {
                $scope.slideTemplate = result;
                $('#deleteSlideTemplateConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            SlideTemplate.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteSlideTemplateConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            SlideTemplateSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.slideTemplates = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.slideTemplate = {name: null, description: null, content: null, id: null};
        };
    });