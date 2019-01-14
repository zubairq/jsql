async function kinetic_app(args) {
/*
created_timestamp(1547358111247)
base_component_id("kinetic")
visibility("PUBLIC")
display_name("Copy of Kinetic app")
is_app(true)
description('Kinetic app')
uses_javascript_librararies(["advanced_bundle"])
logo_url("/man.jpg")
*/

    Vue.component('kinetic',{
      template:
`<div id="app2" style='padding: 20px;'>
    <div class="btn btn-danger" value="Click" v-on:click="evt()" >
        Click
    </div>

    <div>

        <div
            style="display: inline-block;width:50%;vertical-align:top;">
                <img    id="man22"
                        width="200px"
                        src="/man.jpg">
                </img>
                <div></div>
                <video  autoplay="true"
                    width=200 height=200
                    style="width:200px;height:200px;background-color:gray;"
                    id="videoElement">

                </video>
        </div>




        <div
            style="display: inline-block;width:45%;vertical-align:top;">
           <a-scene physics-world="" physics="debug: true" style='width: 80%; height: 80%;' embedded>

            <a-entity position="0 1.25 -2" radius="1.25" color="#EF2D5E">
               <a-sphere v-bind:position='" " + nose_x + " " + nose_y + " -5"'
                         v-if='nose_score > .9'
                         radius=".1" color="#EF2D5E"></a-sphere>

               <a-sphere v-bind:position='" " + left_eye_x + " " + left_eye_y + " -5"'
                         v-if='left_eye_score > .9'
                         radius=".1" color="blue"></a-sphere>

               <a-sphere v-bind:position='" " + right_eye_x + " " + right_eye_y + " -5"'
                         v-if='right_eye_score > .9'
                         radius=".1" color="blue"></a-sphere>

               <a-sphere v-bind:position='" " + left_ear_x + " " + left_ear_y + " -5"'
                         v-if='left_ear_score > .9'
                         radius=".1" color="blue"></a-sphere>

               <a-sphere v-bind:position='" " + right_ear_x + " " + right_ear_y + " -5"'
                         v-if='right_ear_score > .9'
                         radius=".1" color="blue"></a-sphere>

               <a-sphere v-bind:position='" " + left_shoulder_x + " " + left_shoulder_y + " -5"'
                         v-if='left_shoulder_score > .9'
                         radius=".1" color="gray"></a-sphere>

               <a-sphere v-bind:position='" " + right_shoulder_x + " " + right_shoulder_y + " -5"'
                         v-if='right_shoulder_score > .9'
                         radius=".1" color="gray"></a-sphere>

               <a-sphere v-bind:position='" " + left_elbow_x + " " + left_elbow_y + " -5"'
                         v-if='left_elbow_score > .9'
                         radius=".1" color="yellow"></a-sphere>

               <a-sphere v-bind:position='" " + right_elbow_x + " " + right_elbow_y + " -5"'
                         v-if='right_elbow_score > .9'
                         radius=".1" color="yellow"></a-sphere>

               <a-sphere v-bind:position='" " + left_wrist_x + " " + left_wrist_y + " -5"'
                         v-if='left_wrist_score > .9'
                         radius=".1" color="yellow"></a-sphere>

               <a-sphere v-bind:position='" " + right_wrist_x + " " + right_wrist_y + " -5"'
                         v-if='right_wrist_score > .9'
                         radius=".1" color="yellow"></a-sphere>

               <a-sphere v-bind:position='" " + left_hip_x + " " + left_hip_y + " -5"'
                         v-if='left_hip_score > .9'
                         radius=".1" color="green"></a-sphere>

               <a-sphere v-bind:position='" " + right_hip_x + " " + right_hip_y + " -5"'
                         v-if='right_hip_score > .9'
                         radius=".1" color="green"></a-sphere>

               <a-sphere v-bind:position='" " + left_knee_x + " " + left_knee_y + " -5"'
                         v-if='left_knee_score > .9'
                         radius=".1" color="green"></a-sphere>

               <a-sphere v-bind:position='" " + right_knee_x + " " + right_knee_y + " -5"'
                         v-if='right_knee_score > .9'
                         radius=".1" color="green"></a-sphere>

               <a-sphere v-bind:position='" " + left_ankle_x + " " + left_ankle_y + " -5"'
                         v-if='left_ankle_score > .9'
                         radius=".1" color="green"></a-sphere>

               <a-sphere v-bind:position='" " + right_ankle_x + " " + right_ankle_y + " -5"'
                         v-if='right_ankle_score > .9'
                         radius=".1" color="green"></a-sphere>
            </a-entity>




               <a-plane  static-body
                         position="0 0 -4"
                         rotation="-90 0 0" width="4" height="4" color="#7BC8A4">
               </a-plane>
               <a-sky color="#ECECEC"></a-sky>
            </a-scene>
        </div>
    </div>

</div>`,
      mounted: async function() {
          var video = document.querySelector("#videoElement");

            if (navigator.mediaDevices.getUserMedia) {
                var stream = await navigator.mediaDevices.getUserMedia({video: {
                  height: 200,
                  width: 200,
                  facingMode: 'user'
                }})
                video.srcObject = stream;
                this.evt()
            }


      }
      ,
      methods: {
          evt: async function()  {
            //alert("Started")
            for (var i = 0 ; i <100;i++) {
            var aqq = document.getElementById('videoElement');

            if (isValidObject(aqq)) {
                var net = await posenet.load();
                var pose2 = await net.estimateSinglePose(aqq,0.5,false,16)
                //alert(JSON.stringify(pose2,null,2))
                var keypoints = pose2.keypoints
                var shoulderDivider = 30
                for (var rrr = 0; rrr < keypoints.length; rrr++  ) {
                    var point = keypoints[rrr]
                    if (point.part=="nose") {
                        this.nose_x = (point.position.x / shoulderDivider) - 5
                        this.nose_y = 5 - (point.position.y / 60)
                        this.nose_score = point.score
                    }
                    if (point.part=="leftEye") {
                        this.left_eye_x = (point.position.x / shoulderDivider) - 5
                        this.left_eye_y = 5 - (point.position.y / 60)
                        this.left_eye_score = point.score
                    }
                    if (point.part=="rightEye") {
                        this.right_eye_x = (point.position.x / shoulderDivider) - 5
                        this.right_eye_y = 5 - (point.position.y / 60)
                        this.right_eye_score = point.score
                    }
                    if (point.part=="leftEar") {
                        this.left_ear_x = (point.position.x / shoulderDivider) - 5
                        this.left_ear_y = 5 - (point.position.y / 60)
                        this.left_ear_score = point.score
                    }
                    if (point.part=="rightEar") {
                        this.right_ear_x = (point.position.x / shoulderDivider) - 5
                        this.right_ear_y = 5 - (point.position.y / 60)
                        this.right_ear_score = point.score
                    }
                    if (point.part=="leftShoulder") {
                        this.left_shoulder_x = (point.position.x / shoulderDivider) - 5
                        this.left_shoulder_y = 5 - (point.position.y / 60)
                        this.left_shoulder_score = point.score
                    }
                    if (point.part=="rightShoulder") {
                        this.right_shoulder_x = (point.position.x / shoulderDivider) - 5
                        this.right_shoulder_y = 5 - (point.position.y / 60)
                        this.right_shoulder_score = point.score
                    }
                    if (point.part=="leftElbow") {
                        this.left_elbow_x = (point.position.x / shoulderDivider) - 5
                        this.left_elbow_y = 5 - (point.position.y / 60)
                        this.left_elbow_score = point.score
                    }
                    if (point.part=="rightElbow") {
                        this.right_elbow_x = (point.position.x / shoulderDivider) - 5
                        this.right_elbow_y = 5 - (point.position.y / 60)
                        this.right_elbow_score = point.score
                    }
                    if (point.part=="leftWrist") {
                        this.left_wrist_x = (point.position.x / shoulderDivider) - 5
                        this.left_wrist_y = 5 - (point.position.y / 60)
                        this.left_wrist_score = point.score
                    }
                    if (point.part=="rightWrist") {
                        this.right_wrist_x = (point.position.x / shoulderDivider) - 5
                        this.right_wrist_y = 5 - (point.position.y / 60)
                        this.right_wrist_score = point.score
                    }
                    if (point.part=="leftHip") {
                        this.left_hip_x = (point.position.x / shoulderDivider) - 5
                        this.left_hip_y = 5 - (point.position.y / 60)
                        this.left_hip_score = point.score
                    }
                    if (point.part=="rightHip") {
                        this.right_hip_x = (point.position.x / shoulderDivider) - 5
                        this.right_hip_y = 5 - (point.position.y / 60)
                        this.right_hip_score = point.score
                    }
                    if (point.part=="leftKnee") {
                        this.left_knee_x = (point.position.x / shoulderDivider) - 5
                        this.left_knee_y = 5 - (point.position.y / 60)
                        this.left_knee_score = point.score
                    }
                    if (point.part=="rightKnee") {
                        this.right_knee_x = (point.position.x / shoulderDivider) - 5
                        this.right_knee_y = 5 - (point.position.y / 60)
                        this.right_knee_score = point.score
                    }
                    if (point.part=="leftAnkle") {
                        this.left_ankle_x = (point.position.x / shoulderDivider) - 5
                        this.left_ankle_y = 5 - (point.position.y / 60)
                        this.left_ankle_score = point.score
                    }
                    if (point.part=="rightAnkle") {
                        this.right_ankle_x = (point.position.x / shoulderDivider) - 5
                        this.right_ankle_y = 5 - (point.position.y / 60)
                        this.right_ankle_score = point.score
                    }
                }
                }
                }

            }
      },
      data: function() {
          return {
              nose_x: 0,
              nose_y: 0,
              nose_score: 0,
              left_elbow_x: 0,
              left_elbow_y: 0,
              left_elbow_score: 0,
              right_elbow_x: 0,
              right_elbow_y: 0,
              right_elbow_score: 0,
              left_shoulder_x: 0,
              left_shoulder_y: 0,
              left_shoulder_score: 0,
              right_shoulder_x: 0,
              right_shoulder_y: 0,
              right_shoulder_score: 0,
              left_eye_x: 0,
              left_eye_y: 0,
              left_eye_score: 0,
              right_eye_x: 0,
              right_eye_y: 0,
              right_eye_score: 0,
              left_ear_x: 0,
              left_ear_y: 0,
              left_ear_score: 0,
              right_ear_x: 0,
              right_ear_y: 0,
              right_ear_score: 0,
              left_wrist_x: 0,
              left_wrist_y: 0,
              left_wrist_score: 0,
              right_wrist_x: 0,
              right_wrist_y: 0,
              right_wrist_score: 0,
              left_hip_x: 0,
              left_hip_y: 0,
              left_hip_score: 0,
              right_hip_x: 0,
              right_hip_y: 0,
              right_hip_score: 0,
              left_knee_x: 0,
              left_knee_y: 0,
              left_knee_score: 0,
              right_knee_x: 0,
              right_knee_y: 0,
              right_knee_score: 0,
              left_ankle_x: 0,
              left_ankle_y: 0,
              left_ankle_score: 0,
              right_ankle_x: 0,
              right_ankle_y: 0,
              right_ankle_score: 0
          }
      }

    })
}