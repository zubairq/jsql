function(args) {
/*
is_app(true)
component_type("VB")
display_name("postgres client control")
description("This will return the postgres control")
base_component_id("postgres_client_component")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
docker("docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres")
properties(
    [
        {
            id:      "user",
            name:    "USER",
            type:    "String",
            default_expression: "(typeof $POSTGRES_USER !== 'undefined')?eval('$POSTGRES_USER'):'postgres'"
        }
        ,
        {
            id:     "password",
            name:   "Password",
            password: true,
            type:   "String",
            default_expression: "(typeof $POSTGRES_PASSWORD !== 'undefined')?eval('$POSTGRES_PASSWORD'):'docker'",
        }
        ,
        {
            id:     "database",
            name:   "Database",
            type:   "String",
            default_expression: "(typeof $POSTGRES_DATABASE !== 'undefined')?eval('$POSTGRES_DATABASE'):'postgres'",
        }
        ,
        {
            id:     "port",
            name:   "Port",
            type:   "Number",
            default_expression: "(typeof $POSTGRES_PORT !== 'undefined')?eval('$POSTGRES_PORT'):5432",
        }
        ,
        {
            id:     "host",
            name:   "Host",
            type:   "String",
            default_expression: "(typeof $POSTGRES_HOST !== 'undefined')?$POSTGRES_HOST:'localhost'",
        }
        ,
        {
            id:     "design_time_text",
            name:   "Design Time Text",
            type:   "String",
            help:       `<div>Help text for
                            <b>text</b> property
                         </div>`
        }

        ,
        {
            id:     "result",
            name:   "result",
            type:   "Array",
            default:    []
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:         "runQuery",
            pre_snippet: `await `,
            async:        true,
            snippet:    `runQuery()`,
            name:       "runQuery",
            type:       "Action",
            help:       `<div>Help text for
                            <b>runQuery</b> function
                            <div>The SQL is store in the "sql" property</div>
                         </div>`
        }
        ,

        {
            id:         "getSchema",
            pre_snippet: `await `,
            snippet:    `getSchema()`,
            name:       "getSchema",
            type:       "Action",
            help:       `<div>Help text for
                            <b>getSchema</b> function
                         </div>`
        }
        ,

        {
            id:         "connect",
            pre_snippet: `await `,
            snippet:    `connect()`,
            name:       "connect",
            type:       "Action",
            help:       `<div>Help text for
                            <b>connect</b> function
                         </div>`
        }
        ,



        {
            id:     "limit",
            name:   "Limit",
            type:   "Number",
            default_expression: "(typeof $RETURNED_ROWS_LIMIT !== 'undefined')?eval('$RETURNED_ROWS_LIMIT'):100",
        }
        ,
        {
            id:     "sql",
            name:   "SQL",
            type:   "String",
            default: "SELECT * FROM pg_catalog.pg_tables;"
        }
        ,
        {
            id:         "select_columns",
            name:       "Select columns",
            type:       "Array",
            default:     []
        }
        ,
        {
            id:         "select_table",
            name:       "Select table",
            type:       "String",
            default:    ""
        }
        ,
        {
            id:     "getTables",
            name:   "getTables",
            type:   "Action"
        }
        ,

        {
            id:     "getColumns",
            name:   "getColumns",
            type:   "Action"
        }


        ,
        {
            id:         "design_mode_table",
            name:       "Design Table",
            type:       "String",
            default:    "",
            hidden:     true
        }




    ]
)//properties
logo_url("/driver_icons/postgres.jpg")
*/

    Vue.component("postgres_client_component",{
        props: ["meta","properties","args", "name","refresh", "design_mode"]
        ,
        template: `<div v-bind:style='"white-space:normal;height:100%;width:100%; border: 0px;" +
                                    "background-color: "+    args["background_color"]  +  ";"'>
                                    <div v-if="design_mode">

                                    <div class="form-group">


                                    <div class="form-group row">
                                          <label for="col_input_host"    class="col-sm-3"  >Host</label>
                                          <input  type=text
                                                  class="form-control  col-sm-8"
                                                  id=col_input_host
                                                  name="col_input_host"
                                                  required
                                                  v-model:value='args.host'
                                                  v-on:change="args.host = document.getElementById('col_input_host').value;"
                                                  >
                                          </input>
                                     </div>


                                     <div class="form-group row">
                                          <label for="col_input_port"    class="col-sm-3"  >Port</label>
                                          <input  type=text
                                                  class="form-control  col-sm-8"
                                                  id=col_input_port
                                                  name="col_input_port"
                                                  required
                                                  v-model:value='args.port'
                                                  v-on:change="args.port = document.getElementById('col_input_port').value;"
                                                  >
                                          </input>
                                      </div>



                                      <div class="form-group row">
                                            <label for="col_input_port"    class="col-sm-3"  >Database</label>
                                            <input  type=text
                                                    class="form-control  col-sm-8"
                                                    id=col_input_database
                                                    name="col_input_database"
                                                    required
                                                    v-model:value='args.database'
                                                    v-on:change="args.database = document.getElementById('col_input_database').value;"
                                                    >
                                            </input>
                                        </div>



                                        <div class="form-group row">
                                          <label for="col_input_user_name"  class="col-sm-3"  >Username</label>
                                          <input  type=text
                                                  class="form-control  col-sm-8"
                                                  id=col_input_user_name
                                                  name="col_input_user_name"
                                                  required
                                                  v-model:value='args.user'
                                                  v-on:change="args.user = document.getElementById('col_input_user_name').value;"
                                                  >
                                          </input>
                                        </div>


                                        <div class="form-group row">
                                          <label for="col_input_password"  class="col-sm-3">Password</label>
                                          <input  type=password
                                                  class="form-control  col-sm-8"
                                                  id=col_input_password
                                                  name="col_input_password"
                                                  required
                                                  v-model:value='args.password'
                                                  v-on:change="args.password = document.getElementById('col_input_password').value;"
                                                  >
                                          </input>
                                        </div>


                                  </div>


                                    </div>
                                    <div v-else>
                                    Postgres:
                                                POSTGRES LIVE
                                    </div>
                 </div>`
        ,
        data: function() {
            return {
                design_time_text:   "",
                design_detail_tab:  "connection"
                ,

                tables:             [ ]
            }
        }
        ,
        watch: {
          // This would be called anytime the value of the input changes
          refresh(newValue, oldValue) {
              if (isValidObject(this.args)) {
                  this.design_time_text = this.args.design_time_text
              }
          }
        },
        mounted: async function() {
            registerComponent(this)

            if (this.design_mode) {
            } else {

            }
        }
        ,
        methods: {
            getSchema: async function() {
                return null
            }
            ,


            connect: async function() {
                var result = await callFunction(
                                    {
                                        driver_name: "postgres_server",
                                        method_name: "postgres_sql"  }
                                        ,{
                                            sql:             "SELECT * FROM pg_catalog.pg_tables;",
                                            user:            this.args.user,
                                            password:        this.args.password,
                                            database:        this.args.database,
                                            host:            this.args.host,
                                            port:            this.args.port
                                         })


               if (result && result.failed) {
                    return false
               }

               return true
            }
            ,








            runQuery: async function() {
                try {
                    let result = null

                    if (this.properties.select_columns) {
                        let colSql = "*"
                        if (this.properties.select_columns.length > 0) {
                            colSql = ""
                            for (var coli=0; coli < this.properties.select_columns.length; coli ++) {
                                colSql += "\"" + this.properties.select_columns[coli].value + "\""
                                if (coli< (this.properties.select_columns.length - 1)) {
                                    colSql += ","
                                }
                            }
                        }
                        let sql = "select " + colSql + " from " + this.properties.select_table

                        //if (this.args.where_clause && (this.args.where_clause.length > 0)) {
                        //    this.args.sql += " where " + this.args.where_clause
                        //}
                        result = await callFunction(
                                            {
                                                driver_name: "postgres_server",
                                                method_name: "postgres_sql"  }
                                                ,{
                                                    sql:             sql,
                                                    user:            this.args.user,
                                                    password:        this.args.password,
                                                    database:        this.args.database,
                                                    host:            this.args.host,
                                                    port:            this.args.port
                                                 })

                    } else if (this.properties.sql) {
                        result = await callFunction(
                                            {
                                                driver_name: "postgres_server",
                                                method_name: "postgres_sql"  }
                                                ,{
                                                    sql:             this.properties.sql,
                                                    user:            this.args.user,
                                                    password:        this.args.password,
                                                    database:        this.args.database,
                                                    host:            this.args.host,
                                                    port:            this.args.port
                                                 })
                    }



                    //alert("runQuery: " + JSON.stringify(result,null,2))
                    console.log(JSON.stringify(result,null,2))
                    if (result) {
                        this.args.result = result

                        return result
                    }
                } catch (catchErr) {
                   //debugger
                   console.log(JSON.stringify(catchErr,null,2))
                }

                this.args.result = []
                //this.changedFn()
                return {}
            }
            ,






            changedFn: function() {
                if (isValidObject(this.args)) {
                    //this.args.text = this.text
                }
            }


            ,


            getTables: async function() {
                //debugger
                console.log("In getTables")

                if (this.design_mode) {

                    var result = await callFunction(
                                        {
                                            driver_name: "postgres_server",
                                            method_name: "postgres_sql"  }
                                            ,{
                                                user:            this.args.user,
                                                password:        this.args.password,
                                                database:        this.args.database,
                                                host:            this.args.host,
                                                port:            this.args.port,
                                                get_tables:      true
                                             })


                   //alert("runQuery: " + JSON.stringify(result,null,2))
                   console.log(JSON.stringify(result,null,2))
                   if (result) {
                       this.tables = []
                       //alert(JSON.stringify(result,null,2))
                       for (var i=0;i<result.length;i++) {
                           this.tables.push(result[i].name)

                       }
                   }
                   return result


                }
            }
            ,





            getColumns: async function() {
                console.log("In getColumns")
                //debugger

                if (this.design_mode) {
                    var result = await callFunction(
                                        {
                                            driver_name: "postgres_server",
                                            method_name: "postgres_sql"  }
                                            ,{
                                                user:            this.args.user,
                                                password:        this.args.password,
                                                database:        this.args.database,
                                                host:            this.args.host,
                                                port:            this.args.port,
                                                get_columns:      true,
                                                table:           this.args.design_mode_table
                                             })


                   //alert("runQuery: " + JSON.stringify(result,null,2))
                   console.log(JSON.stringify(result,null,2))
                   if (result) {
                       this.args.columns = []
                       //alert(JSON.stringify(result,null,2))
                       for (var i=0;i<result.length;i++) {
                           this.args.columns.push(result[i].name)

                       }
                   }

                   return this.args.columns
                }
            }










        }
    })
}
