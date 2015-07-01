// Backbone view for the entire app
var AppView = Backbone.View.extend({

  el:'#main',

  initialize: function(){
    console.log(this.model.get('signedin'));

    this.model.on('change', function(){
      this.render();
    }, this);

    this.marketingView = new MarketingPage({model: this.model, collection: this.collection});
    this.dashboardView = new DashboardView({collection: this.collection});
    
    this.aboutusView = new AboutUsView();
    this.signupView = new SignupView({model: this.model});
    this.signinView = new SigninView({model: this.model});
    this.render();
    window.location.hash = 'front';
  },

  setUsername: function(name) {
    this.model.set('username', name);
    this.dashboardView.setUsername(name);
  },

  renderBody: function(view) {
    this.$el.empty();
    view.delegateEvents();
    this.marketingView.delegateEvents();
    this.dashboardView.delegateEvents();
    this.dashboardView.infoView.delegateEvents();
    this.$el.append([
      view.$el
    ]);
  },

  render: function(){
    var context = this;
    // immediately makes a request to see if user is signed in
    $.ajax({
      url:'/auth',
      success: function (response) {
        context.model.set('signedin', true);
        context.setUsername(response);
        context.renderBody(context.dashboardView);
       },
      error: function() {
        context.renderBody(context.marketingView);
      }
    });
  },

  dashboard: function(){
    this.renderBody(this.dashboardView, false);
  },

  signup: function() {
    this.renderBody(this.signupView, false);
  },

  signin: function() {
    this.renderBody(this.signinView, false);
  },

  aboutus: function() {
    this.renderBody(this.aboutusView, false);
  },

  portfolios: function () {
    this.$el.empty();
    this.portfoliosView = new PortfoliosView({collection: this.collection});
    if (this.model.get('signedin')) {
      navbar = this.template(this.model.attributes);
    }
    this.$el.append([
      this.portfoliosView.$el
    ]);
  }

});
