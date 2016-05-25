//
// modification of getTypep to use "this"  object and calling it by call/apply/bind


//
// function to define type of "this"  object , checking existing of unique methods of class
function getTypep(){
  if(this.guard){
		return "Dog";
  }
  if(this.seeInDark){
		return "Cat";
  }
  if(this.makeHoleTree){
		return "Woodpecker";		
  }
  return "Another";
}

// inheritance by Object.create()

//
// main class  Animal
var Animal={
  constructor:function(age, name, sound, region) { 
    this.age = age;
    this.name = name;
    this.sound = sound;
    this.region = region;
	return this;
  }
};
Animal.say = function () { // common method say()
    console.log("Sound of " + this.name + " : " + this.sound) ;
};

//
// child class Dog 
var Dog = Object.create(Animal);
Dog.constructor = function(age, name, sound, region){
	Animal.constructor.apply(this, arguments);
	return this;
}
Dog.goAway = function () { // method goAway() - own implementation by Dog 
    	console.log("run away " + this.name) ;
}
Dog.guard = function () { // unique method guard() by Dog 
    	console.log(this.name + " try to guard your") ;
}

//
// child class Cat 
var Cat = Object.create(Animal);
Cat.constructor = function(age, name, sound, region){
	Animal.constructor.apply(this, arguments);
	return this;
}
Cat.goAway = function () { // method goAway() - own implementation by Cat 
    	console.log("climb to tree " + this.name) ;
}
Cat.seeInDark = function () { // unique method seeInDark() by Cat 
    	console.log(this.name + " walk and see at the night") ;
}

//
// child class Woodpecker 
var Woodpecker = Object.create(Animal);
Woodpecker.constructor = function(age, name, sound, region){
	Animal.constructor.apply(this, arguments);
	return this;
}
Woodpecker.goAway = function () { // method goAway() - own implementation by Woodpecker 
    	console.log("fly away " + this.name) ;
}
Woodpecker.makeHoleTree = function () { // unique method makeHoleTree() by Woodpecker 
    	console.log(this.name + "makes a hole in a tree") ;
}

// objects of classes
var dog = Object.create(Dog).constructor(5,"Jack",'gau-gau',"Scotland");
var cat = Object.create(Cat).constructor(7,"Tom",'mur-mur',"Siam");
var woody = Object.create(Woodpecker).constructor(1,"Woo",'tuk tuk tuk',"forest");
console.log(dog);
console.log(cat);
console.log(woody);


// calling methods say() and goAway() for all classes
dog.say();
dog.goAway();
cat.say();
cat.goAway();
woody.say();
woody.goAway();

// calling methods getTypep() for all classes
console.log(getTypep.call(dog) + " class");
console.log(getTypep.apply(cat,[]) + " class");
console.log(getTypep.bind(woody)() + " class");
 
