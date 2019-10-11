export const skeletonHtml = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Page Skeleton</title>
  <style>
    html,
    body {
      padding: 0;
      margin: 0
    }

    .multiple-pic {}

    .multiple-pic h3 {}

    .multiple-pic img {
      width: 33%
    }

    .single-pic {
      display: flex
    }

    .single-pic img {
      width: 33%
    }

    .sk-transparent {
      color: transparent !important
    }

    .sk-opacity {
      opacity: 0 !important
    }

    .sk-text-14-2857 {
      background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
      background-size: 100% 1.6380rem;
      position: relative !important
    }

    .sk-text {
      background-origin: content-box !important;
      background-clip: content-box !important;
      background-color: transparent !important;
      color: transparent !important;
      background-repeat: repeat-y !important
    }

    .sk-button {
      color: #EFEFEF !important;
      background: #EFEFEF !important;
      border: none !important;
      box-shadow: none !important
    }

    .sk-image {
      background: #EFEFEF !important
    }

    .sk-rect {
      border-radius: 0
    }

    .sk-pseudo::before,
    .sk-pseudo::after {
      background: #EFEFEF !important;
      background-image: none !important;
      color: transparent !important;
      border-color: transparent !important
    }

    .sk-pseudo-rect::before,
    .sk-pseudo-rect::after {
      border-radius: 0 !important
    }

    .sk-pseudo-circle::before,
    .sk-pseudo-circle::after {
      border-radius: 50% !important
    }

    @keyframes loading-rotate {
      100% {
        transform: rotate(360deg)
      }
    }

    @keyframes loading-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0
      }

      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px
      }

      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px
      }
    }

    .sk-loading-spinner {
      top: 50%;
      margin-top: -0.5rem;
      width: 100%;
      text-align: center;
      position: absolute
    }

    .sk-loading-spinner .circular {
      height: 1rem;
      width: 1rem;
      animation: loading-rotate 2s linear infinite
    }

    .sk-loading-spinner .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke-linecap: round
    }

  </style>
</head>

<body>

  <div id="app" class="sk-pseudo sk-pseudo-circle">
    <div class="container sk-pseudo sk-pseudo-circle">
      <div class="sk-pseudo sk-pseudo-circle"><span class="sk-transparent sk-opacity sk-pseudo sk-pseudo-circle">推荐</span><span class="sk-transparent sk-opacity sk-pseudo sk-pseudo-circle">视频</span><a href="/home/setting" class="sk-transparent sk-opacity sk-pseudo sk-pseudo-circle" style="text-decoration-color: transparent;">+</a></div>
      <div class="sk-pseudo sk-pseudo-circle">
        <div class="item undefined sk-pseudo sk-pseudo-circle">
          <div class="content sk-transparent sk-pseudo sk-pseudo-circle">农业<button class="sk-transparent sk-button sk-pseudo sk-pseudo-circle" style="border: none;">增加猪价项</button>
            <div class="sk-transparent sk-pseudo sk-pseudo-circle">echarts0</div>
          </div>
        </div>
        <div class="item multiple-pic sk-pseudo sk-pseudo-circle">
          <h3 class="sk-transparent sk-text-14-2857 sk-text sk-pseudo sk-pseudo-circle" style="background-size: 100% 1.638rem;">新职业从业者,新职业从业者月,月收入,美团研究院,新职业从业者月收入</h3><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle">
        </div>
        <div class="item single-pic sk-pseudo sk-pseudo-circle">
          <h3 class="sk-transparent sk-text-14-2857 sk-text sk-pseudo sk-pseudo-circle">被胡歌无视，让巩俐发怒李安灰心，金马奖终于把自己“作”凉了？<span style="display: inline-block; width: 50%; background: rgb(255, 255, 255); position: absolute; bottom: 0px; right: 0px;"></span></h3><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="103.4375" class="sk-image sk-rect sk-pseudo sk-pseudo-circle">
        </div>
        <div class="item multiple-pic sk-pseudo sk-pseudo-circle">
          <h3 class="sk-transparent sk-text-14-2857 sk-text sk-pseudo sk-pseudo-circle" style="background-size: 100% 1.638rem;">新职业从业者,新职业从业者月,月收入,美团研究院,新职业从业者月收入</h3><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle">
        </div>
        <div class="item single-pic sk-pseudo sk-pseudo-circle">
          <h3 class="sk-transparent sk-text-14-2857 sk-text sk-pseudo sk-pseudo-circle">被胡歌无视，让巩俐发怒李安灰心，金马奖终于把自己“作”凉了？<span style="display: inline-block; width: 50%; background: rgb(255, 255, 255); position: absolute; bottom: 0px; right: 0px;"></span></h3><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="103.4375" class="sk-image sk-rect sk-pseudo sk-pseudo-circle">
        </div>
        <div class="item multiple-pic sk-pseudo sk-pseudo-circle">
          <h3 class="sk-transparent sk-text-14-2857 sk-text sk-pseudo sk-pseudo-circle" style="background-size: 100% 1.638rem;">新职业从业者,新职业从业者月,月收入,美团研究院,新职业从业者月收入</h3><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="136.609375" height="95.296875" class="sk-image sk-rect sk-pseudo sk-pseudo-circle">
        </div>
      </div>
    </div>
  </div>


  <div class="sk-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
      <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
    </svg></div>
</body>

</html>
`;