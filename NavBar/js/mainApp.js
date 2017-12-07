angular.module('navbarCustomTest',['ngSanitize'])

.controller('navbarDirectiveCtrl',function($scope){
  
  $scope.affixed = 'top';
  $scope.search = {
    show : true,
    terms : ''
  };
  $scope.brand = "<span class='glyphicon glyphicon-user'></span> Brand";
  $scope.inverse = true;
  $scope.menus = [
    {
      title : "Dropdown Menu",
      menu : [
        {
          title : "Menu Item 1",
          action : "item.one"
        },
        {
          title : "Menu Item 2",
          action : "item.two"
        },
        {
          divider: true
        },
        {
          title : "Menu Item 3",
          action : "item.three"
        }
      ]
    },
    {
      title : "Singular Menu Item",
      action : "singular"
    }
  ]; 
  $scope.item = '';
  $scope.styling = 'Inverse';
  $scope.searchDisplay = 'Visible';
  
  $scope.searchfn = function(){
    alert('Attempting search on: "' + $scope.search.terms + '"');
  }; 
  
  $scope.navfn = function(action){
    switch(action){
      case 'item.one':
        $scope.item = 'Item one selected.';
        break;
      case 'item.two':
        $scope.item = 'Item two selected.';
        break;
      case 'item.three':
        $scope.item = 'Item three selected.';
        break;
      case 'singular':
        $scope.item = 'Singular link item selected.';
        break;
      default:
        $scope.item = 'Default selection.';
        break;
    }; 
  }; 
  
  $scope.toggleStyling = function(){
    $scope.inverse = !$scope.inverse;
    if(angular.equals($scope.inverse,true))
      $scope.styling = 'Inverse';
    else
      $scope.styling = 'Default';
  }; 
  
  $scope.toggleSearchForm = function(){
    $scope.search.show = !$scope.search.show;
    if(angular.equals($scope.search.show,true))
      $scope.searchDisplay = 'Visible';
    else
      $scope.searchDisplay = 'Hidden';
  }; 
  
  $scope.addMenu = function(){
    $scope.menus.push({
        title : "Added On The Fly!",
        action : "default"
    });
  }; 
  
  $scope.toggleAffixed = function(){
    switch($scope.affixed){
      case 'top':
        $scope.affixed = 'bottom';
        break;
      case 'bottom':
        $scope.affixed = 'none';
        break;
      case 'none':
        $scope.affixed = 'top';
        break;
    };
  }; 
}) 


.directive('navbar',function(){
  return {
    restrict : 'AE',
    scope : {
      brand : '=',
      menus : '=',
      affixed : '=',
      search : '=',
      searchfn : '&',
      navfn : '&',
      inverse : '='
    },
    templateUrl : 'tmpls/nav/customizenavbar.html',
    controller : function($scope,$element,$attrs){
      
      $scope.defaults = {
        brand : '<span class="glyphicon glyphicon-certificate"></span>',
        menus : [],
        search : {
          show : false
        }
      }; 
      
      if(angular.isUndefined($attrs.navfn)){
        $scope.navfn = function(action){
          if(angular.isObject(action))
            $scope.$emit('nav.menu',action);  
          else
            $scope.$emit('nav.menu',{'action' : action});
        }; 
      }
      if(angular.isUndefined($attrs.searchfn)){
        $scope.searchfn = function(){
          $scope.$emit('nav.search.execute');
        }; 
      }
      
      
      $scope.$watch('affixed',function(val,old){
        var b = angular.element('body');

        if(angular.equals(val,'top') && !b.hasClass('navbar-affixed-top')){
          if(b.hasClass('navbar-affixed-bottom'))
            b.removeClass('navbar-affixed-bottom');
          b.addClass('navbar-affixed-top');

        }else if(angular.equals(val,'bottom') && !b.hasClass('navbar-affixed-bottom')){
          if(b.hasClass('navbar-affixed-top'))
            b.removeClass('navbar-affixed-top');
          b.addClass('navbar-affixed-bottom');
        }else{
          if(b.hasClass('navbar-affixed-top'))
            b.removeClass('navbar-affixed-top');
          if(b.hasClass('navbar-affixed-bottom'))
            b.removeClass('navbar-affixed-bottom');
        }
      }); 
      
      
      $scope.noop = function(){
        angular.noop();
      }; 
      
      $scope.navAction = function(action){
        $scope.navfn({'action' : action});
      }; 
      

      $scope.haveBranding = function(){
        return (angular.isDefined($attrs.brand)) ? $scope.brand : $scope.defaults.brand;
      }; 
      
      $scope.hasMenus = function(){
        return (angular.isDefined($attrs.menus));
      };
      

      $scope.hasDropdownMenu = function(menu){
        return (angular.isDefined(menu.menu) && angular.isArray(menu.menu));
      }; 

      $scope.isDivider = function(item){
        return (angular.isDefined(item.divider) && angular.equals(item.divider,true));
      }; 
    }
  };
}) 

.run(function($templateCache){
  $templateCache.put('tmpls/nav/customizenavbar.html','<nav class="navbar" ng-class="{\'navbar-inverse\': inverse,\'navbar-default\': !inverse,\'navbar-fixed-top\': affixed == \'top\',\'navbar-fixed-bottom\': affixed == \'bottom\'}" role="navigation"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"><span class="sr-only">Toggle Navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" ng-click="noop()" ng-bind-html="haveBranding()"></a></div><div class="collapse navbar-collapse" id="navbar-menu"><ul class="nav navbar-nav" ng-if="hasMenus()"><li ng-repeat="menu in menus" ng-class="{true: \'dropdown\'}[hasDropdownMenu(menu)]"><a ng-if="!hasDropdownMenu(menu)" ng-click="navAction(menu.action)">{{menu.title}}</a><a ng-if="hasDropdownMenu(menu)" class="dropdown-toggle" data-toggle="dropdown">{{menu.title}} <b class="caret"></b></a><ul ng-if="hasDropdownMenu(menu)" class="dropdown-menu"><li ng-repeat="item in menu.menu" ng-class="{true: \'divider\'}[isDivider(item)]"><a ng-if="!isDivider(item)" ng-click="navAction(item.action)">{{item.title}}</a></li></ul></li></ul><form ng-if="search.show" class="navbar-form navbar-right" role="search"><div class="form-group"><input type="text" class="form-control" placeholder="Search" ng-model="search.terms"><button class="btn btn-default" type="button" ng-click="searchfn()"><span class="glyphicon glyphicon-search"></span></button></div></form></div></div></nav>');
});