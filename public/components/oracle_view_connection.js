


// ------------------------------------------------------------------------------------------------
//                                     oracle-view-connection
//
// view the oracle connection
//
// ------------------------------------------------------------------------------------------------
Vue.component('oracle-view-connection', {
  props: ['connection_name'],

  template: multi_line_string(function() {/*!
<div>
     <table class="table table-striped table-bordered " style="width: 100%;">
        <tbody>
          <tr scope="row"><td>Type</td><td>oracle</td></tr>
          <tr scope="row"><td>ID</td><td>{{get_connection_property(connection_name,'id')}}</td></tr>
          <tr scope="row"><td>Status</td><td>{{get_connection_property(connection_name,'status')}}</td></tr>
          <tr scope="row"><td>Connect String</td><td>{{get_connection_property(connection_name,'connectString')}}</td></tr>
          <tr scope="row"><td>Username</td><td>{{get_connection_property(connection_name,'user')}}</td></tr>
          <tr scope="row"><td>Password</td><td>*****************</td></tr>
        <tbody>
      </table>
</div>
*/}),

  computed: {

  },
  methods: {
    get_connection_property: function (cn, prop_name) {
      for (cc in this.$store.state.list_of_connections) {
        if (this.$store.state.list_of_connections[cc].id == cn) {
          return this.$store.state.list_of_connections[cc][prop_name];
        };
      };
      return 'Unknown ' + cn + ":" + prop_name;
    },
    OK: function() {
      this.$store.dispatch('add_connection', {cn: this.connection_name, cp: {id: this.connection_name, driver: this.connection_driver}})
      this.$store.dispatch('hide_add_connection')
    },
    Cancel: function() {
      this.$store.dispatch('hide_add_connection')
    }
  }
});





