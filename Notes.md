Good afternoon and welcome, today I am going to talk about the several ways to construct an object in JavaScript.

Who am I? I'm Noah Adams, you can find me at @noah_adams on twitter. I won't say much more, because this is a lightining talk, and I have a couple more things to get out of the way.

So what I want to present today is 11 distinct ways, and a couple of interesting variations, to make new objects in javascript. This is going to be a very brief, superficial taxonomy talk, and I'm going to keep the discussion of what an object is to a minimum.

A warning

There will be a lot of code

but it's going to be very similar, so that we can look at the ways that it's subtly different

Some of it is going ot be fine, reasonable, professional calibre code

Some of it will be quite unreasonable

But let's get to it, The Several Ways

First, the humble literal. One of the interesting features of JavaScript, is that if we want an object, we can just type it out directly: here we have a small github API client.

It has a couple of properties defined, the toekn to use, and the base of hte URL to use to access the API, and a method. You can call this method, supplying and owner and a repo identifier, and you will get back a promise for some JSON describing that repo.

It's quick and dirty, and we get exactly one of it, but it works!

Next, we have what 5 years ago would have been totally fine, but today looks a little ancient: a constructor function, that we can call with the new operator. It takes optional arguments to set the base URL and token and attaches a method, by setting it as a property of the prototype.

We then create one of these things, and call that method. In comaprison to the previous example, we won the ability to create more than one of the object in question.

Despite looking a little antiquated by 2019 standards, this thing is probably also fine.

Now here we have a fun little varaiation on the previous, by adding a little instnaceof check at hte top of the constructor function, we can now use it with or without the new keyword, and still get a .This is great if you love chaining APIs and hate the new keyword, but also adds a little ambiguity or inconsistency.

Now, here we have a constructor, that goes and adds a method directly onto the side of the object without altering the prototype. This works, but every instance is going to go and get its own direct reference to that function, and doing anything with inheritence might get complicated

Now here's a very different beast: here we use Object.assign to cobble together an object from pieces. The configuration parameters are taken from a JOSN string, and then the method is glued on after.

This example is a little contrived, but there are real applications for doing this kind of thing: cobbling together an object by merging together other objects is sometimes called a "mixin" pattern. Also recently, there's been some interesting advice going around that if you have a particularlly large blob of data to bring in for say, serialized application state, using `JSON.parse()` might actually be faster than putting that data into a normal script tag, and allowing it to be parsed as plain javascript.

Now the Object Constructor and clobber: this produces the same object that we got from our first example, the literal, but does it in several imperative statements, rather than a single assignment to the value of an expression.

Now, here's a subtle variation, using Object.create(). Object.create allows us to be very specific about how our new object is connected the prototype chain, or in this example, is disconnected from it. By providing `null` as the argument here, this object can't have standard `Object` methods like `.toString()` called on it.

Now the Factory and Closure: the object this returns still has our familiar `repo` method on it, but once its been created, the baseURL and token can't be changed, because they're taken from the scope of the clientFactory function, rather than looked up on the object using `this`.

OK, back to another reasonable example, here's the ES2015 class. This ends up making objects that are exactly like the Constructor and prototype example earlier, but with more contemporary syntax.

So here's something I learned in researching for this talk, the class syntax doesn't just have its statement form like we saw earlier, there is also an expression form. Here we use that, along with a silly, super dynamic skeleton of a class to build the class we need at the time the function is called. It allows the names of properties set by the constructor, and the implementation of the repo method to be set at call time. We then call, instatiate and use that.

This example is definitely contrived, but there are more legitimate uses for class expressions, where you might want a one-off, anonymous subclass of something, and early JavaScript frameworks used similar constructs of Constructor factories to provide classical inheritence.

OK, now we're doing gang of four Design Patterns, enterprise Java...Script

We start with our familiar Client class, but nwo we're going to provide a specialized object, just for making these things, and of course, enterprise calibre error handling.

The builder itself might seem like overkill, but the result is that we get a nice chaining API for configuring the object, and the builder objects themselves can be passed around with partially or fully configured clients, almost ready to go.

So that's 11 ways to do subtly different versions of the same thing

But wait!

That whole time

we were just making an object with a single method

Why not skip the object?

So here we have a function that returns a function, the first call sets values for the base URL and the token, just like our constructors did in previous examples, and closes over those configruation values, as we've seen before, but what we get back is a function we can call directly, without using the dot operator to look up a property on a function.

So what we get, sort of, is a function that we can provide paramaters to at a differnt time than others. I think using a function that returns a function expresses this idea well, but there's also a built-in way of doing this.

Now this is javascript, and functions are objects, and have methods you can call on them. One of these methods is `bind`, and it allows us to set values for this, and for some arguments, and returns a function with those values fixed. We often see this used when we want ot fix the value of `this` used when binding event handlers, but it works equally well for arguments we want to 

So, let's wrap up, Takeaways:

I hope I have demonstrated, at a minimum, that Javascript has several ways to make an object.
