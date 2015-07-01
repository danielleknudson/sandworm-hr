var MarketingPage = Backbone.View.extend({
  el: '<div class="ui container">',
  events: {
    'click #signin': 'handleSignin',
    'click #signup': 'handleSignup'
  },

  initialize: function(){
    this.signupView = new SignupView({model: this.model});
    this.signinView = new SigninView({model: this.model});
    this.formView = new FormView({collection: this.collection});
    this.graphView = new GraphView({collection: this.collection});
    this.infoView = new InfoView({collection: this.collection});

    this.formView.delegateEvents();

    this.render();
  },
  template: _.template('<div class="ui menu"> \
              <div class="ui text container"> \
                  <a href="#" class="header item" id="home">Portfol.io</a> \
                  <a href="#Dashboard" class="item" id="signin">Sign In</a> \
              </div> \
            </div> \
            <div> \
              <img src=""> \
              <h1>Learn To Invest</h1> \
              <h2>Create, Manage, and Monitor Your Virtual Portfolio</h2> \
              <p>Easily learn to invest without the risk. Join Portfol.io today.</p> \
              <button id="signup">Sign Up</button> \
              <button>Sign Up With Facebook</button> \
            </div> \
          '),
  render: function(){
    this.$el.html([this.template, this.formView.$el, this.graphView.$el]);
  },

  handleSignin: function(){
    console.log('sign in clicked');
    this.$el.append(this.signinView.render());
  },

  handleSignup: function(){
    console.log('sign up clicked');
    this.$el.append(this.signupView.render());
  }

});