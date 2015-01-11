var app = angular.module("newA", ["firebase"]);
app.controller("ArticleCtrlr", function($scope, $firebase) {
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  
  $scope.addMessage = function(title,author,date,text) {
  	$scope.messages.$add({title: title, author: author, date: date, text: text});
  }
});