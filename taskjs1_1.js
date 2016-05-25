// prototype inheritance by functions-constructors

//
// main class  Animal
function Animal(age, name, sound, region) { 
    this.age = age;
    this.name = name;
    this.sound = sound;
    this.region = region;
};
Animal.prototype.say = function () { // common method say()
    console.log("Sound of " + this.name + " : " + this.sound) ;
};

//
// child class Dog 
function Dog(age, name, sound, region) { 
    	Animal.call(this, age, name, sound, region); 
}
inherit(Dog, Animal); // Dog extends Animal
Dog.prototype.goAway = function () { // method goAway() - own implementation by Dog 
    	console.log("run away " + this.name) ;
}
Dog.prototype.guard = function () { // unique method guard() by Dog 
    	console.log(this.name + " try to guard your") ;
}

//
// child class Cat 
function Cat(age, name, sound, region) { 
    	Animal.call(this, age, name, sound, region); 
}
inherit(Cat, Animal);// Cat extends Animal
Cat.prototype.goAway = function () { // method goAway() - own implementation by Cat 
    	console.log("climb to tree " + this.name) ;
}
Cat.prototype.seeInDark = function () { // unique method seeInDark() by Cat 
    	console.log(this.name + " walk and see at the night") ;
}

//
// child class Woodpecker 
function Woodpecker(age, name, sound, region) { 
    	Animal.call(this, age, name, sound, region); 
}
inherit(Woodpecker, Animal); // Woodpecker extends Animal
Woodpecker.prototype.goAway = function () { // method goAway() - own implementation by Woodpecker 
    	console.log("fly away " + this.name) ;
}
Woodpecker.prototype.makeHoleTree = function () { // unique method makeHoleTree() by Woodpecker 
    	console.log(this.name + "makes a hole in a tree") ;
}

// objects of classes
var dog = new Dog(5,"Jack",'gau-gau',"Scotland");
var cat = new Cat(7,"Tom",'mur-mur',"Siam");
var woody = new Woodpecker(1,"Woo",'tuk tuk tuk',"forest");

// calling methods say() and goAway() for all classes
dog.say();
dog.goAway();
cat.say();
cat.goAway();
woody.say();
woody.goAway();

// calling methods getTypep() for all classes
console.log(getTypep(dog) + " class");
console.log(getTypep(cat) + " class");
console.log(getTypep(woody) + " class");

//
// function to inherit one issue to another
function inherit(Child, Parent){
    var F = function () { };
    F.prototype = Parent.prototype;

    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.super = Parent.prototype;
};  

//
// function to define type of the object , checking existing of unique methods of class
function getTypep(obj){
  if(obj.guard){
		return "Dog";
  }
  if(obj.seeInDark){
		return "Cat";
  }
  if(obj.makeHoleTree){
		return "Woodpecker";		
  }
  return "Another";
}