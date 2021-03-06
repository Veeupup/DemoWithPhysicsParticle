"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EvilComing1( nowMission) {
    // The camera to view the scene
    this.kEvil = "assets/EvilComing.png";
    this.kBack = "assets/back.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mEvil = null;
    this.mEvil1 = null;
    this.mEvil2 = null;
    this.mBack = null;
    this.kLight = null;

    this.isTime = true;

    this.nowMission = nowMission;

    this.mRestart = false;
}
gEngine.Core.inheritPrototype(EvilComing1, Scene);

EvilComing1.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        400,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);

    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [0,0,0,1],  //color
        30,         //far
        5,          //near
        5,          //inner
        30,          //outer
        2,          //intensity
        1,
    );
    this.kLight.mFar = 300;


    this.mEvil1 = new LightRenderable(this.kEvil);
    this.mEvil1.setColor([1, 1, 1, 0]);
    this.mEvil1.getXform().setPosition(5, 20);
    this.mEvil1.getXform().setSize(190, 157);
    this.mEvil1.setSpriteSequence(683,0,409,341,5,0);
    this.mEvil1.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mEvil1.setAnimationSpeed(10);
    this.mEvil1.addLight(this.kLight);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4);


    GameObject.call(this, this.mEvil1);

};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
EvilComing1.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();

    // this.mEvil.draw(this.mCamera);
    this.mEvil1.draw(this.mCamera);
    // this.mEvil2.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
EvilComing1.prototype.update = function () {
    // select which character to work with
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
//        var myGame = new MyGame();
//        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
//    };
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    // this.mEvil.updateAnimation();
    this.mEvil1.updateAnimation();
    // this.mEvil2.updateAnimation();

    if(this.isTime){
        this.isTime = false;
        var that = this;
        setTimeout(function(){timeup(that)}, 500);
    };
};

EvilComing1.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kEvil);
    gEngine.Textures.unloadTexture(this.kBack);

    if(this.mRestart){
        var myGame = new EvilComing2();
        gEngine.Core.startScene(myGame,true);
    }
};

EvilComing1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kEvil);
    gEngine.Textures.loadTexture(this.kBack);
};

EvilComing1.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};