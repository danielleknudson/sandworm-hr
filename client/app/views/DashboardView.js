// Backbone view for the dashboard
var DashboardView = Backbone.View.extend({

  events: {
    'click #signout': 'handleSignout'
  },

  template: _.template('<div class="ui container"> \
                          <div class="ui menu"> \
                              <div class="ui text container"> \
                                  <a href="#" class="header item">Portfol.io</a> \
                                  <a href="#Dashboard" class="item">Dashboard</a> \
                                  <a href="#Followers" class="item">Followers</a> \
                                  <a href="#Following" class="item">Following</a> \
                                  <a href="#Trends" class="item">Trends</a> \
                                  <a href="/" class="item" id="signout">Sign Out</a> \
                              </div> \
                          </div> \
                        </div>'),

  initialize: function(){
    this.graphView = new GraphView({collection: this.collection});
    this.infoView = new InfoView({collection: this.collection});
    this.collection.on('add reset', function() {
      this.render();
    }, this);
    this.render();
  },

  setUsername: function(name) {
    this.infoView.setUsername(name);
  },

  render: function(){
    console.log(this.graphView.$el);
    this.$el.html(this.template);
    // return this.$el.html([
    //   this.graphView.$el,
    //   this.infoView.$el
    // ]);
  },

  handleSignout: function(){
    $.ajax({
      url: '/signout',
      success: function(response){
        console.log('successfully signed out: ', response);

      },
      error: function(response){
        console.log(response);
      }
    });
  }

});
