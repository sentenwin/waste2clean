angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})
.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.pet-index');
  };
  
})
.controller('adoptCtrl', function($scope, $state) {
   
  $scope.userRequest = function(requested) {
	$scope.activity = [];
    var msg = 'The user'  ;
    msg += (requested ? ' has Requested at ' : ' Garbage has been Collected at , ');
	msg += (new Date()).toString().split(' ').splice(1,3).join(' '); 
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    } 
  };
  
})

.controller('ForgotCtrl', function($scope, $state, $ionicPopup) {
  
  $scope.getOTP = function(user) {
    console.log('GetOTP', user);
var alertPopup = $ionicPopup.alert({
     title: 'OTP Password for Reset',
     template: 'Your password sent to you phone' + user.phone+' use that to signin'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
    $state.go('signin');
  };
  
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('signin');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});


angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Organic Wastages', description: 'Few synthetic fertilizers can reproduce the benefits of organic compost. Compost naturally buffers alkaline and acidic soils, releases nutrients more slowly than synthetic fertilizers, provides macro- and micro-nutrients not available synthetically and, best of all, costs nothing to make.' },
    { id: 1, title: 'E-Wastages', description: 'Most electronic waste goes through a recycling system called a WEEE (Waste Electrical and Electronic Equipment), which not only recycles 95-98%, by weight, of all ewaste passed through it, but ensures that any data left on hard drives and memories are thoroughly destroyed too..Recycling Cathode Ray Tubes, most commonly found in computer monitors and old televisions, is more complicated than recycling most electronic waste.' },
    { id: 2, title: 'Medical Wastages', description: 'Old prescription bottles can be used to store the little things that are floating all over your bedroom dresser — collar stays, jewelry, ChapSticks, loose buttons. In the kitchen, you can use them to store toothpicks, or restaurant salt and ketchup packets.Prescription bottles also make for a great travel-size container.In the kitchen, you can use them to store toothpicks, or restaurant salt and ketchup packets.' },
    { id: 3, title: 'Plastic Wastage', description: 'Most plastic jugs and bottles are 100 percent recyclable.Plastic bottles is one of the most popular and useful materials of modern times. Its popularity is part of the problem: we now use about 20 times more plastic than we did 50 years ago. However, we can optimise the lifespan of plastics by reusing and recycling items as many times as possible. ' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'forgot-password.html',
      controller: 'ForgotCtrl'
    })
    .state('intro', {
    url: '/',
    templateUrl: 'intro.html',
    controller: 'IntroCtrl'
  })
    // the pet tab has its own child nav-view and history
    .state('tab.pet-index', {
      url: '/pets',
      views: {
        'pets-tab': {
          templateUrl: 'pet-index.html',
          controller: 'PetIndexCtrl'
        }
      }
    })

    .state('tab.pet-detail', {
      url: '/pet/:petId',
      views: {
        'pets-tab': {
          templateUrl: 'pet-detail.html',
          controller: 'PetDetailCtrl'
        }
      }
    })

    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'adopt-tab': {
          templateUrl: 'adopt.html',
          controller: 'adoptCtrl'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
