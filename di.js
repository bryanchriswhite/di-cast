/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.8 (26-OCT-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
function Member(t) {
  if (this.getAccess = function() {
    return i
  }, this.setAccess = function(t) {
    t != i && (i = t, $(document).trigger("member-access", t))
  }, this.getListenKey = function() {
    return n
  }, this.setListenKey = function(t) {
    t != n && (n = t ? t : "", $(document).trigger("member-listenkey", t))
  }, this.getSpeed = function() {
    var t = e.wp.streamlist.getSpeeds(e.wp.member.getAccess(), "webplayer");
    return t[r] && "object" == typeof t[r] ? r : ($.log(LogPrefix() + "AudioAddict.WP.Member: Current speed {" + r + "} is invalid; defaulting to first available {" + Object.keys(t)[0] + "}"), r = Object.keys(t)[0])
  }, "undefined" == typeof t) throw "AudioAddict.WP.Member: FATAL: No parameters provided";
  if ("premium" == t.access && !t.listenKey) throw "AudioAddict.WP.Member: FATAL: listenKey is required for Premium users";
  var e = NS("AudioAddict.WP"),
      i = t.access,
      n = t.listenKey ? t.listenKey : "",
      r = t.speed;
  $.log(LogPrefix() + "AudioAddict.WP.Member: Initialized")
}

function Ping(t) {
  function e() {
    $.log(LogPrefix() + "AudioAddict.WP.Ping: Ping"), $.ajax({
      dataType: "jsonp",
      jsonpCallback: "_AudioAddict_WP_Ping__ping",
      url: n,
      success: function(t) {
        $.log(LogPrefix() + "AudioAddict.WP.Ping: Pong", t), $(document).trigger("ping-time", {
          time: t.time
        }), s.wp.setLocale(t.country ? t.country : !1)
      }
    })
  }
  if (this.stop = function() {
    $.log(LogPrefix() + "AudioAddict.WP.Ping: Stopped, cancelling ping"), clearInterval(i)
  }, this.start = function() {
    $.log(LogPrefix() + "AudioAddict.WP.Ping: Started"), i = setInterval(e, 1e3 * r)
  }, "undefined" == typeof t) throw "AudioAddict.WP.Ping: FATAL: No parameters provided";
  if (!t.url) throw "AudioAddict.WP.Ping: FATAL: url not provided";
  var i, n = t.url,
      r = t.interval ? t.interval : 1800,
      s = NS("AudioAddict.WP");
  this.start(), $(document).bind("wp-connect", function() {
    e()
  }), $.log(LogPrefix() + "AudioAddict.WP.Ping: Initialized, pinging every " + r + " seconds")
}

function Player() {
  function t(i) {
    var n = LogPrefix() + "AudioAddict.WP.Player: loading {" + i + "}";
    $.log(0 === E.attempts ? n : n + " retry attempt {" + E.attempts + "/" + I + "}, retrying in " + T + " seconds"), p._play(i), x = "connecting", E.attempts += 1, E.attempts > I ? ($.log(LogPrefix() + "AudioAddict.WP.Player: no response from player when loading {" + i + "} after trying " + I + " times. Moving on to next stream."), e(), a(AudioAddict.WP.Error.BufferTimeout)) : E.timeout = setTimeout(function() {
      "connecting" === x && t(i)
    }, 1e3 * T)
  }

  function e() {
    clearTimeout(E.timeout), E.attempts = 0
  }

  function i(t) {
    $.log(LogPrefix() + "AudioAddict.WP.Player: DEBUG: Buffer size {" + t + "} seconds"), t ? l() : o("NetStream.Buffer.Empty")
  }

  function n(t) {
    $.log(LogPrefix() + "AudioAddict.WP.Player: Flash WebPlayer {" + t + "} ready"), p = $("#player")[0], setTimeout(function() {
      x = "ready", g()
    }, 600)
  }

  function r(t) {
    $.log(LogPrefix() + "AudioAddict.WP.Player: Flash metadata received: " + t), $(document).trigger("player-metadata", JSON.parse(t))
  }

  function s() {
    x = "connected", k = {}, v(), di.eventbus.trigger("webplayer:playback:start")
  }

  function o(t) {
    switch ($.log(LogPrefix() + "AudioAddict.WP.Player: Flash WebPlayer status {" + t + "} with tracked state {" + x + "}"), "undefined" == typeof k[t] ? k[t] = 1 : k[t] ++, t) {
      case "NetStream.Play.Start":
        e(), "connected" != x && s();
        break;
      case "NetStream.Play.StreamNotFound":
        e(), a(AudioAddict.WP.Error.BufferTimeout);
        break;
      case "NetStream.Buffer.Flush":
        e(), k["NetStream.Buffer.Flush"] > 25 && ($.log(LogPrefix() + "AudioAddict.WP.Player: Ignoring NetStream.Buffer.Flush and resetting counter"), k["NetStream.Buffer.Flush"] = 0);
        break;
      case "NetStream.Buffer.Empty":
        e(), k["NetStream.Buffer.Empty"] > 50 ? ($.log(LogPrefix() + "AudioAddict.WP.Player: Stopping after > 50 empty buffer events"), k["NetStream.Buffer.Empty"] = 0, a(AudioAddict.WP.Error.BufferTimeout)) : "connecting" == x || P || ($.log(LogPrefix() + "AudioAddict.WP.Player: Empty buffer watchdog initiated; will automatically reconnect in {" + A + "} seconds"), P = setTimeout(function() {
          $.log(LogPrefix() + "AudioAddict.WP.Player: Empty buffer watchdog fired; reconnecting because {" + A + "} seconds of empty buffer elapsed"), P = !1, a(AudioAddict.WP.Error.BufferTimeout)
        }, 1e3 * A));
        break;
      case "NetConnection.Connect.Closed":
      case "NetStream.Play.Stop":
        e(), a(AudioAddict.WP.Error.BufferTimeout);
        break;
      case "NetStream.Buffer.Full":
        e(), $.log(LogPrefix() + "AudioAddict.WP.Player: DEBUG: Buffer is full"), l();
        break;
      default:
        $.log(LogPrefix() + "AudioAddict.WP.Player: DEBUG: Unrecognised status reported: {" + t + "}")
    }
  }

  function a(t) {
    m(t)
  }

  function l() {
    P && ($.log(LogPrefix() + "AudioAddict.WP.Player: Empty buffer watchdog cancelled"), clearTimeout(P), P = !1)
  }

  function u(t) {
    NS("AudioAddict.WP").hasFocus ? (b -= d, 0 > b && (b = 0)) : ($.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio out quickly because the browser appears to be in the background"), b = 0), _.setVolume(b), C = setTimeout(function() {
      b > 0 ? u(t) : ($.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio out finished {" + b + "}"), h = !1, t && t.call())
    }, 50)
  }

  function c(t) {
    NS("AudioAddict.WP").hasFocus ? (b += d, b > f && (b = f)) : ($.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio in quickly because the browser appears to be in the background"), b = f), _.setVolume(b), C = setTimeout(function() {
      f > b ? c(t) : ($.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio in finished {" + b + "}"), h = !1, t && t.call())
    }, 50)
  }
  var h, d, f, p, g, m, v, y = (NS("AudioAddict.Util"), NS("AudioAddict.WP")),
      _ = this,
      b = 50,
      w = !1,
      x = "disconnected",
      k = {},
      P = !1,
      A = 5,
      C = null,
      S = {
        previouslyMuted: !1,
        previousVolume: 50,
        isTempMuted: !1
      },
      I = 3,
      T = 5,
      E = {
        timeout: null,
        attempts: 0
      };
  this.init = function(t) {
    if ("undefined" == typeof swfobject) throw "AudioAddict.WP.Player: FATAL: swfobject not found";
    if ("undefined" == typeof t) throw "AudioAddict.WP.Player: FATAL: No parameters provided";
    if (!t.onReady) throw "AudioAddict.WP.Player: FATAL: onReady handler not provided";
    if (!t.onError) throw "AudioAddict.WP.Player: FATAL: onError handler not provided";
    if (!t.playerId) throw "AudioAddict.WP.Player: FATAL: playerId not provided";
    if (!t.swfPath) throw "AudioAddict.WP.Player: FATAL: swfPath not provided";
    if (!t.swfContainer) throw "AudioAddict.WP.Player: FATAL: swfContainer not provided";
    if (!$("#" + t.swfContainer)[0]) throw "AudioAddict.WP.Player: FATAL: HTML element {" + t.swfContainer + "} was not found in the DOM";
    window.playerReady = n, window.onMetaData = r, window.onError = a, window.onSecurityError = o, window.onStreamError = o, window.onStatus = o, window.onBuffer = i, g = t.onReady, m = t.onError, v = t.onConnect, "undefined" != typeof t.maxRetryLoadAttempts && (I = t.maxRetryLoadAttempts), "undefined" != typeof t.retryLoadTimeoutDelay && (T = t.retryLoadTimeoutDelay);
    try {
      setTimeout(function() {
        $.log(LogPrefix() + "AudioAddict.WP.Player: Embedding Flash WebPlayer"), swfobject.embedSWF($(document.getElementById(t.swfContainer)).data("url"), t.swfContainer, "80", "25", "10", !1, {
          id: t.playerId,
          name: t.playerId,
          vizEnabled: y.visualizer.enabled.toString(),
          vizColor1: y.visualizer.color1,
          vizColor2: y.visualizer.color2
        }, {
          id: t.playerId,
          name: t.playerId,
          allowfullscreen: "true",
          allowscriptaccess: "always",
          wmode: "transparent",
          scale: "exactfit"
        }, {
          id: t.playerId,
          name: t.playerId
        }, function(t) {
          t.success ? $.log(LogPrefix() + "AudioAddict.WP.Player: Embedded Flash WebPlayer with id {" + t.id + "}") : ($.log(LogPrefix() + "AudioAddict.WP.Player: Embedding Flash WebPlayer failed"), a(AudioAddict.WP.Error.FlashBlocked))
        })
      }, 0)
    } catch (e) {
      throw "AudioAddict.WP.Player: FATAL: Embedding Flash WebPlayer {" + t.swfPath + "}"
    }
  }, this.load = function(e) {
    t(e)
  }, this.stop = function() {
    p._stop(), x = "stopped", di.eventbus.trigger("webplayer:playback:stop")
  }, this.isMuted = function() {
    return w
  }, this.mute = function() {
    $.log(LogPrefix() + "AudioAddict.WP.Player: Muted"), p._mute(w = !0), di.eventbus.trigger("webplayer:volume:change", 0)
  }, this.unMute = function() {
    $.log(LogPrefix() + "AudioAddict.WP.Player: Unmuted"), w = !1, 0 === p._getVolume() && p._mute(w), di.eventbus.trigger("webplayer:volume:change", b)
  }, this.tempMute = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.Player: temporarily muting player"), S.isTempMuted ? void $.log(LogPrefix() + "AudioAddict.WP.Player: tempMute: already temp-muted.") : (S.previouslyMuted = w, S.previousVolume = b, this.fadeOut(), void(S.isTempMuted = !0))
  }, this.tempUnMute = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.Player: lifting temporary mute"), S.isTempMuted ? (f = S.previousVolume, this.fadeIn(), void(S.isTempMuted = !1)) : void $.log(LogPrefix() + "AudioAddict.WP.Player: tempUnMute: was not temporarily muted.")
  }, this.setVolume = function(t) {
    p._setVolume(t / 100), b = t, di.eventbus.trigger("webplayer:volume:change", b)
  }, this.getVolume = function() {
    return b
  }, this.getState = function() {
    return x
  }, this.fadeOut = function(t) {
    $.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio out\u2026"), h && (clearTimeout(C), $.log(LogPrefix() + "AudioAddict.WP.Player: fadeout: Already fading volume, overriding with this fadeout.")), h = !0, f = b, d = b / 15, u(t)
  }, this.fadeIn = function(t) {
    h && (clearTimeout(C), $.log(LogPrefix() + "AudioAddict.WP.Player: fadeIn: Already fading volume, overriding with this fadeIn.")), $.log(LogPrefix() + "AudioAddict.WP.Player: Fading audio in\u2026"), h = !0, d = f / 15, c(t)
  }
}

function Streamlist(t) {
  function e() {
    g = !0
  }

  function i(t) {
    o = _.shuffle(t), $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Streamlist updated", o)
  }
  if (this.init = function() {
    n = c.wp.member.getAccess(), r = c.wp.member.getListenKey(), s = c.wp.member.getSpeed(), this.getStreamlist(function(t) {
      i(t), e()
    }), $(document).bind("member-access", function(t, e) {
      $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Access level updated to {" + e + "}"), n = e
    }), $(document).bind("member-listenkey", function(t, e) {
      $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Listen Key updated to {" + e + "}"), r = e
    }), $(document).bind("member-speed", function(t, e) {
      $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Speed updated to {" + e + "}"), s = e
    }), $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Initialized")
  }, this.updateParams = function(t, e) {
    t.channel && (d = t.channel), t.access && (n = t.access), t.speed && (s = t.speed), this.getStreamlist(function(t) {
      i(t), e.call(this, o)
    })
  }, this.getCurrentBitrate = function() {
    var t = h.getSpeeds(c.wp.member.getAccess(), "webplayer")[c.wp.member.getSpeed()];
    return "object" == typeof t ? t.bitrate : null
  }, this.getStreamlist = function(t, e) {
    a = t, l = e ? ++l : 0, $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Fetching list of streams {" + l + "}"), u.Playlists(u.Config.listenUrl, {
      streamset: h.getSpeeds(c.wp.member.getAccess(), "webplayer")[c.wp.member.getSpeed()].key
    }).getChannel(d, function(e) {
      return e.length ? (t.call(this, e), !0) : ($.log(LogPrefix() + "AudioAddict.WP.Streamlist: FATAL: Empty streamlist received, giving up", e), modal("Channel Unavailable", '<p style="color: red;"><strong>This channel is temporarily unavailable.</strong></p><p>Please <a href=""><strong>try again later</strong></a> or choose another channel.</p><p>If you continue to experience problems, use the <em>Help</em> link at the top of the page to contact our support team</a>.', null, 400), c.wp.stop(!0), $(document).trigger("wp-error"), !1)
    }, function(t, e) {
      if ($.log(LogPrefix() + "AudioAddict.WP.Streamlist: Failed to fetch list of streams", t, e), !(10 > l)) throw "AudioAddict.WP.Streamlist: FATAL: Failed to fetch list of streams, giving up";
      $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Reinitiating\u2026"), h.getStreamlist(a, !0)
    })
  }, this.getStream = function() {
    "undefined" == typeof o[++p] ? (p = 0, $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Fetching next stream; reached end of list, looping")) : $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Fetching next stream");
    var t = o[p];
    return $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Stream found: {" + t + "}"), -1 != t.indexOf("pub") && (-1 != t.indexOf(".flv") && (t = t.replace(/\.flv/, "")), t += -1 === t.indexOf("?") ? "?type=.flv" : "&type=.flv", "function" == typeof com_adswizz_synchro_decorateUrl ? ($.log(LogPrefix() + "AudioAddict.WP.Streamlist: Decorating stream URL with Adswizz parameters"), t = com_adswizz_synchro_decorateUrl(t)) : $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Adswizz stream parameters unavailable!")), "premium" == n && (t += "&type=.flv"), t
  }, this.getCurrentStream = function() {
    return o[p]
  }, this.getSpeeds = function(t, e) {
    return f[t][e]
  }, this.isReady = function() {
    return g
  }, "undefined" == typeof t) throw "AudioAddict.WP.Streamlist: FATAL: No parameters provided";
  if (!t.channel) throw "AudioAddict.WP.Streamlist: FATAL: channel not provided";
  if (!t.speeds) throw "AudioAddict.WP.Streamlist: FATAL: speeds not provided";
  var n, r, s, o, a, l, u = NS("AudioAddict.API"),
      c = NS("AudioAddict.WP"),
      h = this,
      d = t.channel,
      f = t.speeds,
      p = -1,
      g = !1;
  t.onReady && (window.__onReady = t.onReady), $.log(LogPrefix() + "AudioAddict.WP.Streamlist: Instantiated but not initialized")
}

function TimeKeeper(t) {
  function e(t) {
    var e = new Date,
        n = new Date(t);
    i.serverTimeOffsetMs = n.getTime() - e.getTime(), i.serverTimeOffsetSec = Math.round(i.serverTimeOffsetMs / 1e3), $.log(LogPrefix() + "AudioAddict.WP.TimeKeeper: Local date  {" + e + "}, time {" + e.getTime() + "} ms"), $.log(LogPrefix() + "AudioAddict.WP.TimeKeeper: Remote date {" + n + "}, time {" + n.getTime() + "} ms"), $.log(LogPrefix() + "AudioAddict.WP.TimeKeeper: Time difference {" + i.serverTimeOffsetMs + "} ms"), i.__onReady && i.__onReady()
  }
  this.getAdjustedDate = function() {
    var t = new Date;
    return t.setTime(t.getTime() + this.serverTimeOffsetMs), t
  }, this.getTimestamp = function() {
    return Math.floor(this.getAdjustedDate().getTime() / 1e3)
  };
  var i = this;
  this.serverTimeOffsetMs = 0, this.serverTimeOffsetSec = 0, "undefined" != typeof t && t.onReady && (this.__onReady = t.onReady), $(document).bind("ping-time", function(t, i) {
    e(i.time)
  }), $.log(LogPrefix() + "AudioAddict.WP.TimeKeeper: Initialized")
}

function UIChannel(t) {
  var e, i;
  e = t.channelTitleId || "#channel-title", i = t.channelDirectorId || "#channel-director", $(document).bind("Channel.Set", function(t, n) {
    $.log(LogPrefix() + "AudioAddict.WP.UIChannel: Channel title changed to {" + n.name + "}"), $(e).html(n.name), $(i).find("span").html(n.channel_director)
  }), $.log(LogPrefix() + "AudioAddict.WP.UIChannel: Initialized")
}

function modal(t, e, i, n, r, s) {
  n = n || "auto", r = r || "dialog", s = s || {
    OK: function() {
      $(this).dialog("close"), $("#" + r).remove()
    }
  }, $("#" + r).remove(), $("body").append($("<div>", {
    id: r,
    title: t
  }).append($("<div>").append(e))), $("#" + r).dialog({
    autoOpen: !0,
    modal: !0,
    width: n,
    buttons: s,
    open: function() {
      $(".ui-dialog-buttonset button").focus()
    },
    close: function() {
      "function" == typeof i && i.call()
    }
  })
}

function UIPlay(t) {
  var e = di.app.module("webplayer.transportmanager");
  if (this.showPlay = function() {
    n.addClass("icon-play").removeClass("icon-stop"), s.css3PieRedraw(i)
  }, this.showStop = function() {
    n.addClass("icon-stop").removeClass("icon-play"), s.css3PieRedraw(i)
  }, this.play = function() {
    a = "playing", "function" == typeof e.playAudio ? e.playAudio() : r.wp.play()
  }, this.stop = function() {
    a = "stopped", "function" == typeof e.stopAudio ? e.stopAudio() : r.wp.stop()
  }, this.PlayPauseToggle = function() {
    "connected" == r.wp.getState() ? ($.log(LogPrefix() + "AudioAddict.WP.UIPlay: Pause triggered; stopping"), o.stop()) : ($.log(LogPrefix() + "AudioAddict.WP.UIPlay: Play triggered; playing"), o.play())
  }, "undefined" == typeof t) throw "AudioAddict.WP.UIPlay: FATAL: No parameters provided";
  if (!t.elemId) throw "AudioAddict.WP.UIPlay: FATAL: elemId not provided";
  var i, n, r = NS("AudioAddict.WP"),
      s = NS("AudioAddict.UI"),
      o = this,
      a = "playing",
      l = $("#" + t.elemId);
  if (!l[0]) throw "AudioAddict.WP.UIPlay: FATAL: HTML element {" + t.elemId + "} was not found in the DOM";
  i = l.append('<div id="ctl-play"><i class="icon"></i></div>').find("#ctl-play"), n = i.find(".icon"), $(document).bind("wp-stop", this.showPlay).bind("wp-connect", this.showStop).bind("WP.PlayPauseToggle", this.PlayPauseToggle), i.click(this.PlayPauseToggle), $.log(LogPrefix() + "AudioAddict.WP.UIPlay: Initialized")
}

function AdManager(t) {
  if (this.yes = function() {
    return !0
  }, this.no = function() {
    return !1
  }, this.canvas = function() {
    return r
  }, this.stop = function() {
    s && s.type && "default" != s.type ? ($.log(LogPrefix() + "AudioAddict.WP.AdManager.stop(): Ending active ad {" + s.type + "}, resuming {default}"), s.end()) : s && !s.type ? $.log(LogPrefix() + "AudioAddict.WP.AdManager.stop(): Unknown active ad found, unable to stop", s) : $.log(LogPrefix() + "AudioAddict.WP.AdManager.stop(): No active ad found to stop")
  }, this.mute = function() {
    return s && s.isExternal() && s.mute()
  }, this.unMute = function() {
    return s && s.isExternal() && s.unMute()
  }, this.isMuted = function() {
    return s && s.isExternal() && s.isMuted()
  }, this.isExternal = function() {
    return s && s.isExternal()
  }, this.type = function() {
    return s ? s.type : "unknown"
  }, "undefined" == typeof t) throw "AudioAddict.WP.AdManager: FATAL: No parameters provided";
  if (!t.providers) throw "AudioAddict.WP.AdManager: FATAL: providers not provided";
  if (!t.canvas) throw "AudioAddict.WP.AdManager: FATAL: canvas not provided";
  var e = NS("AudioAddict.WP.AdManager"),
      i = this,
      n = {},
      r = $(t.canvas),
      s = null,
      o = null,
      a = t.cutoff || 6e4;
  if (!r[0]) throw "AudioAddict.WP.AdManager: FATAL: Unable to locate canvas {" + t.canvas + "}";
  $.each(t.providers, function(t, r) {
    r && (e.providers[t] ? n[t] = new e.providers[t](i) : $.log(LogPrefix() + "AudioAddict.WP.AdManager: Ad provider {" + t + "} requested but not found; missing an include?"))
  }), n["default"] || (n["default"] = new e.providers["default"](i)), s = n["default"].begin(), $(document).bind("ad-new metadata-track", function(t, e) {
    e && "advertisement" === e.type && s.type === e.provider || "default" !== s.type && ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Force-ending latest {" + s.type + "} ad"), s.end())
  }), $(document).bind("ad-new", function(t, e) {
    $.log(LogPrefix() + "AudioAddict.WP.AdManager: Ad event received", e);
    var i, r = n[e.provider];
    return r ? ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Ad provider found {" + e.provider + "}"), void(r.isReady() ? ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Beginning ad with provider {" + e.provider + "} and forced expiry in {" + a / 1e3 + "} seconds"), s = r, i = r.begin(e), i || ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Unable to begin new ad, provider {" + e.provider + "} didn't begin properly. Launching internal provider instead."), s = n.internal, s.begin(e)), clearTimeout(o), o = setTimeout(function() {
      $.log(LogPrefix() + "AudioAddict.WP.AdManager: Timeout reached for ad provider {" + s.type + "}, forcibly ending playback"), s.end()
    }, a)) : ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Unable to begin new ad, provider {" + e.provider + "} is not ready"), s = n["default"].begin()))) : ($.log(LogPrefix() + "AudioAddict.WP.AdManager: Ad provider not found {" + e.provider + "}, aborting"), !1)
  }), $(document).bind("ad-end", function() {
    $.log(LogPrefix() + "AudioAddict.WP.AdManager.{ad-end}: Active ad ended {" + s.type + "}"), clearTimeout(o), "default" != s.type && ($.log(LogPrefix() + "AudioAddict.WP.AdManager.{ad-end}: Resuming default ad"), s = n["default"].begin())
  }), $.log(LogPrefix() + "AudioAddict.WP.AdManager: Initialized")
}! function(t, e) {
  "use strict";

  function i(e) {
    t.fn.cycle.debug && n(e)
  }

  function n() {
    window.console && console.log && console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
  }

  function r(e, i, n) {
    var r = t(e).data("cycle.opts");
    if (r) {
      var s = !!e.cyclePause;
      s && r.paused ? r.paused(e, r, i, n) : !s && r.resumed && r.resumed(e, r, i, n)
    }
  }

  function s(i, s, o) {
    function l(e, i, r) {
      if (!e && i === !0) {
        var s = t(r).data("cycle.opts");
        if (!s) return n("options not found, can not resume"), !1;
        r.cycleTimeout && (clearTimeout(r.cycleTimeout), r.cycleTimeout = 0), d(s.elements, s, 1, !s.backwards)
      }
    }
    if (i.cycleStop === e && (i.cycleStop = 0), (s === e || null === s) && (s = {}), s.constructor == String) {
      switch (s) {
        case "destroy":
        case "stop":
          var u = t(i).data("cycle.opts");
          return u ? (i.cycleStop++, i.cycleTimeout && clearTimeout(i.cycleTimeout), i.cycleTimeout = 0, u.elements && t(u.elements).stop(), t(i).removeData("cycle.opts"), "destroy" == s && a(i, u), !1) : !1;
        case "toggle":
          return i.cyclePause = 1 === i.cyclePause ? 0 : 1, l(i.cyclePause, o, i), r(i), !1;
        case "pause":
          return i.cyclePause = 1, r(i), !1;
        case "resume":
          return i.cyclePause = 0, l(!1, o, i), r(i), !1;
        case "prev":
        case "next":
          return (u = t(i).data("cycle.opts")) ? (t.fn.cycle[s](u), !1) : (n('options not found, "prev/next" ignored'), !1);
        default:
          s = {
            fx: s
          }
      }
      return s
    }
    if (s.constructor == Number) {
      var c = s;
      return (s = t(i).data("cycle.opts")) ? 0 > c || c >= s.elements.length ? (n("invalid slide index: " + c), !1) : (s.nextSlide = c, i.cycleTimeout && (clearTimeout(i.cycleTimeout), i.cycleTimeout = 0), "string" == typeof o && (s.oneTimeFx = o), d(s.elements, s, 1, c >= s.currSlide), !1) : (n("options not found, can not advance slide"), !1)
    }
    return s
  }

  function o(e, i) {
    if (!t.support.opacity && i.cleartype && e.style.filter) try {
      e.style.removeAttribute("filter")
    } catch (n) {}
  }

  function a(e, i) {
    i.next && t(i.next).unbind(i.prevNextEvent), i.prev && t(i.prev).unbind(i.prevNextEvent), (i.pager || i.pagerAnchorBuilder) && t.each(i.pagerAnchors || [], function() {
      this.unbind().remove()
    }), i.pagerAnchors = null, t(e).unbind("mouseenter.cycle mouseleave.cycle"), i.destroy && i.destroy(i)
  }

  function l(i, s, a, l, f) {
    var v, y = t.extend({}, t.fn.cycle.defaults, l || {}, t.metadata ? i.metadata() : t.meta ? i.data() : {}),
        _ = t.isFunction(i.data) ? i.data(y.metaAttr) : null;
    _ && (y = t.extend(y, _)), y.autostop && (y.countdown = y.autostopCount || a.length);
    var b = i[0];
    if (i.data("cycle.opts", y), y.$cont = i, y.stopCount = b.cycleStop, y.elements = a, y.before = y.before ? [y.before] : [], y.after = y.after ? [y.after] : [], !t.support.opacity && y.cleartype && y.after.push(function() {
      o(this, y)
    }), y.continuous && y.after.push(function() {
      d(a, y, 0, !y.backwards)
    }), u(y), t.support.opacity || !y.cleartype || y.cleartypeNoBg || m(s), "static" == i.css("position") && i.css("position", "relative"), y.width && i.width(y.width), y.height && "auto" != y.height && i.height(y.height), y.startingSlide !== e ? (y.startingSlide = parseInt(y.startingSlide, 10), y.startingSlide >= a.length || y.startSlide < 0 ? y.startingSlide = 0 : v = !0) : y.startingSlide = y.backwards ? a.length - 1 : 0, y.random) {
      y.randomMap = [];
      for (var w = 0; w < a.length; w++) y.randomMap.push(w);
      if (y.randomMap.sort(function() {
        return Math.random() - .5
      }), v)
        for (var x = 0; x < a.length; x++) y.startingSlide == y.randomMap[x] && (y.randomIndex = x);
      else y.randomIndex = 1, y.startingSlide = y.randomMap[1]
    } else y.startingSlide >= a.length && (y.startingSlide = 0);
    y.currSlide = y.startingSlide || 0;
    var k = y.startingSlide;
    s.css({
      position: "absolute",
      top: 0,
      left: 0
    }).hide().each(function(e) {
      var i;
      i = y.backwards ? k ? k >= e ? a.length + (e - k) : k - e : a.length - e : k ? e >= k ? a.length - (e - k) : k - e : a.length - e, t(this).css("z-index", i)
    }), t(a[k]).css("opacity", 1).show(), o(a[k], y), y.fit && (y.aspect ? s.each(function() {
      var e = t(this),
          i = y.aspect === !0 ? e.width() / e.height() : y.aspect;
      y.width && e.width() != y.width && (e.width(y.width), e.height(y.width / i)), y.height && e.height() < y.height && (e.height(y.height), e.width(y.height * i))
    }) : (y.width && s.width(y.width), y.height && "auto" != y.height && s.height(y.height))), !y.center || y.fit && !y.aspect || s.each(function() {
      var e = t(this);
      e.css({
        "margin-left": y.width ? (y.width - e.width()) / 2 + "px" : 0,
        "margin-top": y.height ? (y.height - e.height()) / 2 + "px" : 0
      })
    }), !y.center || y.fit || y.slideResize || s.each(function() {
      var e = t(this);
      e.css({
        "margin-left": y.width ? (y.width - e.width()) / 2 + "px" : 0,
        "margin-top": y.height ? (y.height - e.height()) / 2 + "px" : 0
      })
    });
    var P = (y.containerResize || y.containerResizeHeight) && !i.innerHeight();
    if (P) {
      for (var A = 0, C = 0, S = 0; S < a.length; S++) {
        var I = t(a[S]),
            T = I[0],
            E = I.outerWidth(),
            M = I.outerHeight();
        E || (E = T.offsetWidth || T.width || I.attr("width")), M || (M = T.offsetHeight || T.height || I.attr("height")), A = E > A ? E : A, C = M > C ? M : C
      }
      y.containerResize && A > 0 && C > 0 && i.css({
        width: A + "px",
        height: C + "px"
      }), y.containerResizeHeight && C > 0 && i.css({
        height: C + "px"
      })
    }
    var O = !1;
    if (y.pause && i.bind("mouseenter.cycle", function() {
      O = !0, this.cyclePause++, r(b, !0)
    }).bind("mouseleave.cycle", function() {
      O && this.cyclePause--, r(b, !0)
    }), c(y) === !1) return !1;
    var j = !1;
    if (l.requeueAttempts = l.requeueAttempts || 0, s.each(function() {
      var e = t(this);
      if (this.cycleH = y.fit && y.height ? y.height : e.height() || this.offsetHeight || this.height || e.attr("height") || 0, this.cycleW = y.fit && y.width ? y.width : e.width() || this.offsetWidth || this.width || e.attr("width") || 0, e.is("img")) {
        var i = t.browser.msie && 28 == this.cycleW && 30 == this.cycleH && !this.complete,
            r = t.browser.mozilla && 34 == this.cycleW && 19 == this.cycleH && !this.complete,
            s = t.browser.opera && (42 == this.cycleW && 19 == this.cycleH || 37 == this.cycleW && 17 == this.cycleH) && !this.complete,
            o = 0 === this.cycleH && 0 === this.cycleW && !this.complete;
        if (i || r || s || o) {
          if (f.s && y.requeueOnImageNotLoaded && ++l.requeueAttempts < 100) return n(l.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function() {
            t(f.s, f.c).cycle(l)
          }, y.requeueTimeout), j = !0, !1;
          n("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
        }
      }
      return !0
    }), j) return !1;
    if (y.cssBefore = y.cssBefore || {}, y.cssAfter = y.cssAfter || {}, y.cssFirst = y.cssFirst || {}, y.animIn = y.animIn || {}, y.animOut = y.animOut || {}, s.not(":eq(" + k + ")").css(y.cssBefore), t(s[k]).css(y.cssFirst), y.timeout) {
      y.timeout = parseInt(y.timeout, 10), y.speed.constructor == String && (y.speed = t.fx.speeds[y.speed] || parseInt(y.speed, 10)), y.sync || (y.speed = y.speed / 2);
      for (var D = "none" == y.fx ? 0 : "shuffle" == y.fx ? 500 : 250; y.timeout - y.speed < D;) y.timeout += y.speed
    }
    if (y.easing && (y.easeIn = y.easeOut = y.easing), y.speedIn || (y.speedIn = y.speed), y.speedOut || (y.speedOut = y.speed), y.slideCount = a.length, y.currSlide = y.lastSlide = k, y.random ? (++y.randomIndex == a.length && (y.randomIndex = 0), y.nextSlide = y.randomMap[y.randomIndex]) : y.nextSlide = y.backwards ? 0 === y.startingSlide ? a.length - 1 : y.startingSlide - 1 : y.startingSlide >= a.length - 1 ? 0 : y.startingSlide + 1, !y.multiFx) {
      var F = t.fn.cycle.transitions[y.fx];
      if (t.isFunction(F)) F(i, s, y);
      else if ("custom" != y.fx && !y.multiFx) return n("unknown transition: " + y.fx, "; slideshow terminating"), !1
    }
    var N = s[k];
    return y.skipInitializationCallbacks || (y.before.length && y.before[0].apply(N, [N, N, y, !0]), y.after.length && y.after[0].apply(N, [N, N, y, !0])), y.next && t(y.next).bind(y.prevNextEvent, function() {
      return p(y, 1)
    }), y.prev && t(y.prev).bind(y.prevNextEvent, function() {
      return p(y, 0)
    }), (y.pager || y.pagerAnchorBuilder) && g(a, y), h(y, a), y
  }

  function u(e) {
    e.original = {
      before: [],
      after: []
    }, e.original.cssBefore = t.extend({}, e.cssBefore), e.original.cssAfter = t.extend({}, e.cssAfter), e.original.animIn = t.extend({}, e.animIn), e.original.animOut = t.extend({}, e.animOut), t.each(e.before, function() {
      e.original.before.push(this)
    }), t.each(e.after, function() {
      e.original.after.push(this)
    })
  }

  function c(e) {
    var r, s, o = t.fn.cycle.transitions;
    if (e.fx.indexOf(",") > 0) {
      for (e.multiFx = !0, e.fxs = e.fx.replace(/\s*/g, "").split(","), r = 0; r < e.fxs.length; r++) {
        var a = e.fxs[r];
        s = o[a], s && o.hasOwnProperty(a) && t.isFunction(s) || (n("discarding unknown transition: ", a), e.fxs.splice(r, 1), r--)
      }
      if (!e.fxs.length) return n("No valid transitions named; slideshow terminating."), !1
    } else if ("all" == e.fx) {
      e.multiFx = !0, e.fxs = [];
      for (var l in o) o.hasOwnProperty(l) && (s = o[l], o.hasOwnProperty(l) && t.isFunction(s) && e.fxs.push(l))
    }
    if (e.multiFx && e.randomizeEffects) {
      var u = Math.floor(20 * Math.random()) + 30;
      for (r = 0; u > r; r++) {
        var c = Math.floor(Math.random() * e.fxs.length);
        e.fxs.push(e.fxs.splice(c, 1)[0])
      }
      i("randomized fx sequence: ", e.fxs)
    }
    return !0
  }

  function h(e, i) {
    e.addSlide = function(n, r) {
      var s = t(n),
          o = s[0];
      e.autostopCount || e.countdown++, i[r ? "unshift" : "push"](o), e.els && e.els[r ? "unshift" : "push"](o), e.slideCount = i.length, e.random && (e.randomMap.push(e.slideCount - 1), e.randomMap.sort(function() {
        return Math.random() - .5
      })), s.css("position", "absolute"), s[r ? "prependTo" : "appendTo"](e.$cont), r && (e.currSlide++, e.nextSlide++), t.support.opacity || !e.cleartype || e.cleartypeNoBg || m(s), e.fit && e.width && s.width(e.width), e.fit && e.height && "auto" != e.height && s.height(e.height), o.cycleH = e.fit && e.height ? e.height : s.height(), o.cycleW = e.fit && e.width ? e.width : s.width(), s.css(e.cssBefore), (e.pager || e.pagerAnchorBuilder) && t.fn.cycle.createPagerAnchor(i.length - 1, o, t(e.pager), i, e), t.isFunction(e.onAddSlide) ? e.onAddSlide(s) : s.hide()
    }
  }

  function d(n, r, s, o) {
    function a() {
      {
        var t = 0;
        r.timeout
      }
      r.timeout && !r.continuous ? (t = f(n[r.currSlide], n[r.nextSlide], r, o), "shuffle" == r.fx && (t -= r.speedOut)) : r.continuous && l.cyclePause && (t = 10), t > 0 && (l.cycleTimeout = setTimeout(function() {
        d(n, r, 0, !r.backwards)
      }, t))
    }
    var l = r.$cont[0],
        u = n[r.currSlide],
        c = n[r.nextSlide];
    if (s && r.busy && r.manualTrump && (i("manualTrump in go(), stopping active transition"), t(n).stop(!0, !0), r.busy = 0, clearTimeout(l.cycleTimeout)), r.busy) return void i("transition active, ignoring new tx request");
    if (l.cycleStop == r.stopCount && (0 !== l.cycleTimeout || s)) {
      if (!s && !l.cyclePause && !r.bounce && (r.autostop && --r.countdown <= 0 || r.nowrap && !r.random && r.nextSlide < r.currSlide)) return void(r.end && r.end(r));
      var h = !1;
      if (!s && l.cyclePause || r.nextSlide == r.currSlide) a();
      else {
        h = !0;
        var p = r.fx;
        u.cycleH = u.cycleH || t(u).height(), u.cycleW = u.cycleW || t(u).width(), c.cycleH = c.cycleH || t(c).height(), c.cycleW = c.cycleW || t(c).width(), r.multiFx && (o && (r.lastFx === e || ++r.lastFx >= r.fxs.length) ? r.lastFx = 0 : !o && (r.lastFx === e || --r.lastFx < 0) && (r.lastFx = r.fxs.length - 1), p = r.fxs[r.lastFx]), r.oneTimeFx && (p = r.oneTimeFx, r.oneTimeFx = null), t.fn.cycle.resetState(r, p), r.before.length && t.each(r.before, function(t, e) {
          l.cycleStop == r.stopCount && e.apply(c, [u, c, r, o])
        });
        var g = function() {
          r.busy = 0, t.each(r.after, function(t, e) {
            l.cycleStop == r.stopCount && e.apply(c, [u, c, r, o])
          }), l.cycleStop || a()
        };
        i("tx firing(" + p + "); currSlide: " + r.currSlide + "; nextSlide: " + r.nextSlide), r.busy = 1, r.fxFn ? r.fxFn(u, c, r, g, o, s && r.fastOnEvent) : t.isFunction(t.fn.cycle[r.fx]) ? t.fn.cycle[r.fx](u, c, r, g, o, s && r.fastOnEvent) : t.fn.cycle.custom(u, c, r, g, o, s && r.fastOnEvent)
      }
      if (h || r.nextSlide == r.currSlide) {
        var m;
        r.lastSlide = r.currSlide, r.random ? (r.currSlide = r.nextSlide, ++r.randomIndex == n.length && (r.randomIndex = 0, r.randomMap.sort(function() {
          return Math.random() - .5
        })), r.nextSlide = r.randomMap[r.randomIndex], r.nextSlide == r.currSlide && (r.nextSlide = r.currSlide == r.slideCount - 1 ? 0 : r.currSlide + 1)) : r.backwards ? (m = r.nextSlide - 1 < 0, m && r.bounce ? (r.backwards = !r.backwards, r.nextSlide = 1, r.currSlide = 0) : (r.nextSlide = m ? n.length - 1 : r.nextSlide - 1, r.currSlide = m ? 0 : r.nextSlide + 1)) : (m = r.nextSlide + 1 == n.length, m && r.bounce ? (r.backwards = !r.backwards, r.nextSlide = n.length - 2, r.currSlide = n.length - 1) : (r.nextSlide = m ? 0 : r.nextSlide + 1, r.currSlide = m ? n.length - 1 : r.nextSlide - 1))
      }
      h && r.pager && r.updateActivePagerLink(r.pager, r.currSlide, r.activePagerClass)
    }
  }

  function f(t, e, n, r) {
    if (n.timeoutFn) {
      for (var s = n.timeoutFn.call(t, t, e, n, r);
           "none" != n.fx && s - n.speed < 250;) s += n.speed;
      if (i("calculated timeout: " + s + "; speed: " + n.speed), s !== !1) return s
    }
    return n.timeout
  }

  function p(e, i) {
    var n = i ? 1 : -1,
        r = e.elements,
        s = e.$cont[0],
        o = s.cycleTimeout;
    if (o && (clearTimeout(o), s.cycleTimeout = 0), e.random && 0 > n) e.randomIndex--, -2 == --e.randomIndex ? e.randomIndex = r.length - 2 : -1 == e.randomIndex && (e.randomIndex = r.length - 1), e.nextSlide = e.randomMap[e.randomIndex];
    else if (e.random) e.nextSlide = e.randomMap[e.randomIndex];
    else if (e.nextSlide = e.currSlide + n, e.nextSlide < 0) {
      if (e.nowrap) return !1;
      e.nextSlide = r.length - 1
    } else if (e.nextSlide >= r.length) {
      if (e.nowrap) return !1;
      e.nextSlide = 0
    }
    var a = e.onPrevNextEvent || e.prevNextClick;
    return t.isFunction(a) && a(n > 0, e.nextSlide, r[e.nextSlide]), d(r, e, 1, i), !1
  }

  function g(e, i) {
    var n = t(i.pager);
    t.each(e, function(r, s) {
      t.fn.cycle.createPagerAnchor(r, s, n, e, i)
    }), i.updateActivePagerLink(i.pager, i.startingSlide, i.activePagerClass)
  }

  function m(e) {
    function n(t) {
      return t = parseInt(t, 10).toString(16), t.length < 2 ? "0" + t : t
    }

    function r(e) {
      for (; e && "html" != e.nodeName.toLowerCase(); e = e.parentNode) {
        var i = t.css(e, "background-color");
        if (i && i.indexOf("rgb") >= 0) {
          var r = i.match(/\d+/g);
          return "#" + n(r[0]) + n(r[1]) + n(r[2])
        }
        if (i && "transparent" != i) return i
      }
      return "#ffffff"
    }
    i("applying clearType background-color hack"), e.each(function() {
      t(this).css("background-color", r(this))
    })
  }
  var v = "2.9999.8";
  t.support === e && (t.support = {
    opacity: !t.browser.msie
  }), t.expr[":"].paused = function(t) {
    return t.cyclePause
  }, t.fn.cycle = function(e, r) {
    var o = {
      s: this.selector,
      c: this.context
    };
    return 0 === this.length && "stop" != e ? !t.isReady && o.s ? (n("DOM not ready, queuing slideshow"), t(function() {
      t(o.s, o.c).cycle(e, r)
    }), this) : (n("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")), this) : this.each(function() {
      var a = s(this, e, r);
      if (a !== !1) {
        a.updateActivePagerLink = a.updateActivePagerLink || t.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0, this.cycleStop = 0;
        var u = t(this),
            c = a.slideExpr ? t(a.slideExpr, this) : u.children(),
            h = c.get();
        if (h.length < 2) return void n("terminating; too few slides: " + h.length);
        var p = l(u, c, h, a, o);
        if (p !== !1) {
          var g = p.continuous ? 10 : f(h[p.currSlide], h[p.nextSlide], p, !p.backwards);
          g && (g += p.delay || 0, 10 > g && (g = 10), i("first timeout: " + g), this.cycleTimeout = setTimeout(function() {
            d(h, p, 0, !a.backwards)
          }, g))
        }
      }
    })
  }, t.fn.cycle.resetState = function(e, i) {
    i = i || e.fx, e.before = [], e.after = [], e.cssBefore = t.extend({}, e.original.cssBefore), e.cssAfter = t.extend({}, e.original.cssAfter), e.animIn = t.extend({}, e.original.animIn), e.animOut = t.extend({}, e.original.animOut), e.fxFn = null, t.each(e.original.before, function() {
      e.before.push(this)
    }), t.each(e.original.after, function() {
      e.after.push(this)
    });
    var n = t.fn.cycle.transitions[i];
    t.isFunction(n) && n(e.$cont, t(e.elements), e)
  }, t.fn.cycle.updateActivePagerLink = function(e, i, n) {
    t(e).each(function() {
      t(this).children().removeClass(n).eq(i).addClass(n)
    })
  }, t.fn.cycle.next = function(t) {
    p(t, 1)
  }, t.fn.cycle.prev = function(t) {
    p(t, 0)
  }, t.fn.cycle.createPagerAnchor = function(e, n, s, o, a) {
    var l;
    if (t.isFunction(a.pagerAnchorBuilder) ? (l = a.pagerAnchorBuilder(e, n), i("pagerAnchorBuilder(" + e + ", el) returned: " + l)) : l = '<a href="#">' + (e + 1) + "</a>", l) {
      var u = t(l);
      if (0 === u.parents("body").length) {
        var c = [];
        s.length > 1 ? (s.each(function() {
          var e = u.clone(!0);
          t(this).append(e), c.push(e[0])
        }), u = t(c)) : u.appendTo(s)
      }
      a.pagerAnchors = a.pagerAnchors || [], a.pagerAnchors.push(u);
      var h = function(i) {
        i.preventDefault(), a.nextSlide = e;
        var n = a.$cont[0],
            r = n.cycleTimeout;
        r && (clearTimeout(r), n.cycleTimeout = 0);
        var s = a.onPagerEvent || a.pagerClick;
        t.isFunction(s) && s(a.nextSlide, o[a.nextSlide]), d(o, a, 1, a.currSlide < e)
      };
      /mouseenter|mouseover/i.test(a.pagerEvent) ? u.hover(h, function() {}) : u.bind(a.pagerEvent, h), /^click/.test(a.pagerEvent) || a.allowPagerClickBubble || u.bind("click.cycle", function() {
        return !1
      });
      var f = a.$cont[0],
          p = !1;
      a.pauseOnPagerHover && u.hover(function() {
        p = !0, f.cyclePause++, r(f, !0, !0)
      }, function() {
        p && f.cyclePause--, r(f, !0, !0)
      })
    }
  }, t.fn.cycle.hopsFromLast = function(t, e) {
    var i, n = t.lastSlide,
        r = t.currSlide;
    return i = e ? r > n ? r - n : t.slideCount - n : n > r ? n - r : n + t.slideCount - r
  }, t.fn.cycle.commonReset = function(e, i, n, r, s, o) {
    t(n.elements).not(e).hide(), "undefined" == typeof n.cssBefore.opacity && (n.cssBefore.opacity = 1), n.cssBefore.display = "block", n.slideResize && r !== !1 && i.cycleW > 0 && (n.cssBefore.width = i.cycleW), n.slideResize && s !== !1 && i.cycleH > 0 && (n.cssBefore.height = i.cycleH), n.cssAfter = n.cssAfter || {}, n.cssAfter.display = "none", t(e).css("zIndex", n.slideCount + (o === !0 ? 1 : 0)), t(i).css("zIndex", n.slideCount + (o === !0 ? 0 : 1))
  }, t.fn.cycle.custom = function(e, i, n, r, s, o) {
    var a = t(e),
        l = t(i),
        u = n.speedIn,
        c = n.speedOut,
        h = n.easeIn,
        d = n.easeOut;
    l.css(n.cssBefore), o && (u = c = "number" == typeof o ? o : 1, h = d = null);
    var f = function() {
      l.animate(n.animIn, u, h, function() {
        r()
      })
    };
    a.animate(n.animOut, c, d, function() {
      a.css(n.cssAfter), n.sync || f()
    }), n.sync && f()
  }, t.fn.cycle.transitions = {
    fade: function(e, i, n) {
      i.not(":eq(" + n.currSlide + ")").css("opacity", 0), n.before.push(function(e, i, n) {
        t.fn.cycle.commonReset(e, i, n), n.cssBefore.opacity = 0
      }), n.animIn = {
        opacity: 1
      }, n.animOut = {
        opacity: 0
      }, n.cssBefore = {
        top: 0,
        left: 0
      }
    }
  }, t.fn.cycle.ver = function() {
    return v
  }, t.fn.cycle.defaults = {
    activePagerClass: "active",
    after: null,
    allowPagerClickBubble: !1,
    animIn: null,
    animOut: null,
    aspect: !1,
    autostop: 0,
    autostopCount: 0,
    backwards: !1,
    before: null,
    center: null,
    cleartype: !t.support.opacity,
    cleartypeNoBg: !1,
    containerResize: 1,
    containerResizeHeight: 0,
    continuous: 0,
    cssAfter: null,
    cssBefore: null,
    delay: 0,
    easeIn: null,
    easeOut: null,
    easing: "swing",
    end: null,
    fastOnEvent: 0,
    fit: 0,
    fx: "scrollHorz",
    fxFn: null,
    height: "auto",
    manualTrump: !0,
    metaAttr: "cycle",
    next: null,
    nowrap: 0,
    onPagerEvent: null,
    onPrevNextEvent: null,
    pager: null,
    pagerAnchorBuilder: null,
    pagerEvent: "click.cycle",
    pause: 0,
    pauseOnPagerHover: 0,
    prev: null,
    prevNextEvent: "click.cycle",
    random: 0,
    randomizeEffects: 1,
    requeueOnImageNotLoaded: !0,
    requeueTimeout: 250,
    rev: 0,
    shuffle: null,
    skipInitializationCallbacks: !1,
    slideExpr: null,
    slideResize: 1,
    speed: 1e3,
    speedIn: null,
    speedOut: null,
    startingSlide: e,
    sync: 1,
    timeout: 4e3,
    timeoutFn: null,
    updateActivePagerLink: null,
    width: null
  }
}(jQuery),
  /*!
   * jQuery Cycle Plugin Transition Definitions
   * This script is a plugin for the jQuery Cycle Plugin
   * Examples and documentation at: http://malsup.com/jquery/cycle/
   * Copyright (c) 2007-2010 M. Alsup
   * Version:	 2.73
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   */
  function(t) {
    "use strict";
    t.fn.cycle.transitions.scrollHorz = function(e, i, n) {
      e.css("overflow", "hidden").width(), n.before.push(function(e, i, n, r) {
        n.rev && (r = !r), t.fn.cycle.commonReset(e, i, n), n.cssBefore.left = r ? i.cycleW - 1 : 1 - i.cycleW, n.animOut.left = r ? -e.cycleW : e.cycleW
      }), n.cssFirst.left = 0, n.cssBefore.top = 0, n.animIn.left = 0, n.animOut.top = 0
    }
  }(jQuery), $(document).ready(function() {
  var t = {
    slideExpr: ".slide",
    prev: ".paddle.left",
    next: ".paddle.right",
    pager: ".slideshow-paginator",
    pause: !0,
    speed: 250,
    easing: "swing",
    timeout: 5e3,
    pagerAnchorBuilder: function(t) {
      return '<li class="dot" data-ga-event="Slideshow,PagerDotClick,' + t + '"></li>'
    }
  };
  $(".slideshow").each(function() {
    var e = $(this).data(),
        i = $.extend({}, t, e);
    $(this).cycle(i)
  })
}),
  function(t) {
    var e = t(document);
    t.duped = function(i) {
      return e.data(i) ? (t.log(LogPrefix() + i + ": [WARN] Duplicate loading detected!"), !0) : void e.data(i, !0)
    }
  }(jQuery),
  function(t, e) {
    function i(e) {
      var i = t(this);
      i.block(), t.get(e, function(n) {
        i.html(t(n).html()), t.log(r() + "Updated async mod content from {%s}.", e), t(document).trigger("AsyncModule.Updated", [i])
      }).fail(function() {
        i.unblock()
      })
    }

    function n() {
      t("[data-async-url]").not(".ready").each(function() {
        var e = t(this).addClass("ready"),
            n = e.data();
        n.asyncInterval > 0 ? (t.log(r() + "Requesting async mod content from {%s} at interval of {%sms} for target: %o", n.asyncUrl, n.asyncInterval, e), setInterval(function() {
          i.call(e, n.asyncUrl)
        }, n.asyncInterval)) : i.call(e, n.asyncUrl)
      })
    }
    if (!t.duped("AudioAddict.UI.AsyncModule")) {
      var r = function() {
        return e.LogPrefix() + "AudioAddict.UI.AsyncModule: "
      };
      t(n)
    }
  }(jQuery, this),
  function(t, e, i) {
    function n(t) {
      function e() {
        o.di.eventbus.off("webplayer:adblock:begin", n), o.di.eventbus.off("webplayer:playback:start", r)
      }

      function i() {
        "function" != typeof t || a || (a = !0, t())
      }

      function n(t) {
        t && (e(), di.app.module("webplayer.transportmanager").stopAudio(), i())
      }

      function r() {
        e(), di.app.module("webplayer.transportmanager").stopAudio(), i()
      }
      var s = null,
          a = !1;
      s = setInterval(function() {
        o.di && o.di.eventbus && (clearInterval(s), o.di.eventbus.on("webplayer:adblock:begin", n), o.di.eventbus.on("webplayer:playback:start", r)), o.closed && (clearInterval(s), e(), i())
      }, 100)
    }

    function r() {
      var t = null;
      a.addClass("enabled popout-active").html(l), t = setInterval(function() {
        o.closed && (a.removeClass("enabled popout-active").html(""), clearInterval(t), o = null)
      }, 500)
    }
    var s = NS("AudioAddict.WP"),
        o = null,
        a = t("#embedded-player-overlay"),
        l = AudioAddict.UI.Templates.render("#tmpl-popout-active-notice");
    a.on("click", function() {
      o && o.focus()
    }), t("#btn-popout").on("click", function() {
      t(i).trigger("LaunchPopoutPlayer", {
        channel: t(this).data("channel")
      })
    }), t(i).on({
      LaunchPopoutPlayer: function(i, a) {
        var l = {
              channel: null,
              stopEmbedded: !0,
              coverEmbedded: !0,
              afterLaunchCb: null
            },
            u = t.extend({}, l, a),
            c = di.app.module("webplayer").state.isPlaying();
        u.channel = u.channel || t("#btn-popout").data("channel"), e.delayRun = !1, e.skipPreroll = c, u.stopEmbedded && n(u.afterLaunchCb), u.coverEmbedded && r(), o = e.launchPlayer(s.urlBase + u.channel), e.popup = o
      },
      "Channel.Set": function(e, i) {
        t("#btn-popout").data({
          channel: i.key
        })
      },
      "WP.InitError": function() {
        a.removeClass("enabled")
      }
    })
  }(jQuery, this, document);
var swfobject = function() {
  function t() {
    if (!U) {
      try {
        var t = N.getElementsByTagName("body")[0].appendChild(m("span"));
        t.parentNode.removeChild(t)
      } catch (e) {
        return
      }
      U = !0;
      for (var i = $.length, n = 0; i > n; n++) $[n]()
    }
  }

  function e(t) {
    U ? t() : $[$.length] = t
  }

  function i(t) {
    if (typeof F.addEventListener != I) F.addEventListener("load", t, !1);
    else if (typeof N.addEventListener != I) N.addEventListener("load", t, !1);
    else if (typeof F.attachEvent != I) v(F, "onload", t);
    else if ("function" == typeof F.onload) {
      var e = F.onload;
      F.onload = function() {
        e(), t()
      }
    } else F.onload = t
  }

  function n() {
    H ? r() : s()
  }

  function r() {
    var t = N.getElementsByTagName("body")[0],
        e = m(T);
    e.setAttribute("type", O);
    var i = t.appendChild(e);
    if (i) {
      var n = 0;
      ! function() {
        if (typeof i.GetVariable != I) {
          var r = i.GetVariable("$version");
          r && (r = r.split(" ")[1].split(","), V.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)])
        } else if (10 > n) return n++, void setTimeout(arguments.callee, 10);
        t.removeChild(e), i = null, s()
      }()
    } else s()
  }

  function s() {
    var t = R.length;
    if (t > 0)
      for (var e = 0; t > e; e++) {
        var i = R[e].id,
            n = R[e].callbackFn,
            r = {
              success: !1,
              id: i
            };
        if (V.pv[0] > 0) {
          var s = g(i);
          if (s)
            if (!y(R[e].swfVersion) || V.wk && V.wk < 312)
              if (R[e].expressInstall && a()) {
                var c = {};
                c.data = R[e].expressInstall, c.width = s.getAttribute("width") || "0", c.height = s.getAttribute("height") || "0", s.getAttribute("class") && (c.styleclass = s.getAttribute("class")), s.getAttribute("align") && (c.align = s.getAttribute("align"));
                for (var h = {}, d = s.getElementsByTagName("param"), f = d.length, p = 0; f > p; p++) "movie" != d[p].getAttribute("name").toLowerCase() && (h[d[p].getAttribute("name")] = d[p].getAttribute("value"));
                l(c, h, i, n)
              } else u(s), n && n(r);
            else b(i, !0), n && (r.success = !0, r.ref = o(i), n(r))
        } else if (b(i, !0), n) {
          var m = o(i);
          m && typeof m.SetVariable != I && (r.success = !0, r.ref = m), n(r)
        }
      }
  }

  function o(t) {
    var e = null,
        i = g(t);
    if (i && "OBJECT" == i.nodeName)
      if (typeof i.SetVariable != I) e = i;
      else {
        var n = i.getElementsByTagName(T)[0];
        n && (e = n)
      }
    return e
  }

  function a() {
    return !B && y("6.0.65") && (V.win || V.mac) && !(V.wk && V.wk < 312)
  }

  function l(t, e, i, n) {
    B = !0, P = n || null, A = {
      success: !1,
      id: i
    };
    var r = g(i);
    if (r) {
      "OBJECT" == r.nodeName ? (x = c(r), k = null) : (x = r, k = i), t.id = j, (typeof t.width == I || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) && (t.width = "310"), (typeof t.height == I || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) && (t.height = "137"), N.title = N.title.slice(0, 47) + " - Flash Player Installation";
      var s = V.ie && V.win ? "ActiveX" : "PlugIn",
          o = "MMredirectURL=" + F.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + s + "&MMdoctitle=" + N.title;
      if (typeof e.flashvars != I ? e.flashvars += "&" + o : e.flashvars = o, V.ie && V.win && 4 != r.readyState) {
        var a = m("div");
        i += "SWFObjectNew", a.setAttribute("id", i), r.parentNode.insertBefore(a, r), r.style.display = "none",
          function() {
            4 == r.readyState ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
          }()
      }
      h(t, e, i)
    }
  }

  function u(t) {
    if (V.ie && V.win && 4 != t.readyState) {
      var e = m("div");
      t.parentNode.insertBefore(e, t), e.parentNode.replaceChild(c(t), e), t.style.display = "none",
        function() {
          4 == t.readyState ? t.parentNode.removeChild(t) : setTimeout(arguments.callee, 10)
        }()
    } else t.parentNode.replaceChild(c(t), t)
  }

  function c(t) {
    var e = m("div");
    if (V.win && V.ie) e.innerHTML = t.innerHTML;
    else {
      var i = t.getElementsByTagName(T)[0];
      if (i) {
        var n = i.childNodes;
        if (n)
          for (var r = n.length, s = 0; r > s; s++) 1 == n[s].nodeType && "PARAM" == n[s].nodeName || 8 == n[s].nodeType || e.appendChild(n[s].cloneNode(!0))
      }
    }
    return e
  }

  function h(t, e, i) {
    var n, r = g(i);
    if (V.wk && V.wk < 312) return n;
    if (r)
      if (typeof t.id == I && (t.id = i), V.ie && V.win) {
        var s = "";
        for (var o in t) t[o] != Object.prototype[o] && ("data" == o.toLowerCase() ? e.movie = t[o] : "styleclass" == o.toLowerCase() ? s += ' class="' + t[o] + '"' : "classid" != o.toLowerCase() && (s += " " + o + '="' + t[o] + '"'));
        var a = "";
        for (var l in e) e[l] != Object.prototype[l] && (a += '<param name="' + l + '" value="' + e[l] + '" />');
        r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + s + ">" + a + "</object>", W[W.length] = t.id, n = g(t.id)
      } else {
        var u = m(T);
        u.setAttribute("type", O);
        for (var c in t) t[c] != Object.prototype[c] && ("styleclass" == c.toLowerCase() ? u.setAttribute("class", t[c]) : "classid" != c.toLowerCase() && u.setAttribute(c, t[c]));
        for (var h in e) e[h] != Object.prototype[h] && "movie" != h.toLowerCase() && d(u, h, e[h]);
        r.parentNode.replaceChild(u, r), n = u
      }
    return n
  }

  function d(t, e, i) {
    var n = m("param");
    n.setAttribute("name", e), n.setAttribute("value", i), t.appendChild(n)
  }

  function f(t) {
    var e = g(t);
    e && "OBJECT" == e.nodeName && (V.ie && V.win ? (e.style.display = "none", function() {
      4 == e.readyState ? p(t) : setTimeout(arguments.callee, 10)
    }()) : e.parentNode.removeChild(e))
  }

  function p(t) {
    var e = g(t);
    if (e) {
      for (var i in e) "function" == typeof e[i] && (e[i] = null);
      e.parentNode.removeChild(e)
    }
  }

  function g(t) {
    var e = null;
    try {
      e = N.getElementById(t)
    } catch (i) {}
    return e
  }

  function m(t) {
    return N.createElement(t)
  }

  function v(t, e, i) {
    t.attachEvent(e, i), z[z.length] = [t, e, i]
  }

  function y(t) {
    var e = V.pv,
        i = t.split(".");
    return i[0] = parseInt(i[0], 10), i[1] = parseInt(i[1], 10) || 0, i[2] = parseInt(i[2], 10) || 0, e[0] > i[0] || e[0] == i[0] && e[1] > i[1] || e[0] == i[0] && e[1] == i[1] && e[2] >= i[2] ? !0 : !1
  }

  function _(t, e, i, n) {
    if (!V.ie || !V.mac) {
      var r = N.getElementsByTagName("head")[0];
      if (r) {
        var s = i && "string" == typeof i ? i : "screen";
        if (n && (C = null, S = null), !C || S != s) {
          var o = m("style");
          o.setAttribute("type", "text/css"), o.setAttribute("media", s), C = r.appendChild(o), V.ie && V.win && typeof N.styleSheets != I && N.styleSheets.length > 0 && (C = N.styleSheets[N.styleSheets.length - 1]), S = s
        }
        V.ie && V.win ? C && typeof C.addRule == T && C.addRule(t, e) : C && typeof N.createTextNode != I && C.appendChild(N.createTextNode(t + " {" + e + "}"))
      }
    }
  }

  function b(t, e) {
    if (q) {
      var i = e ? "visible" : "hidden";
      U && g(t) ? g(t).style.visibility = i : _("#" + t, "visibility:" + i)
    }
  }

  function w(t) {
    var e = /[\\\"<>\.;]/,
        i = null != e.exec(t);
    return i && typeof encodeURIComponent != I ? encodeURIComponent(t) : t
  } {
    var x, k, P, A, C, S, I = "undefined",
        T = "object",
        E = "Shockwave Flash",
        M = "ShockwaveFlash.ShockwaveFlash",
        O = "application/x-shockwave-flash",
        j = "SWFObjectExprInst",
        D = "onreadystatechange",
        F = window,
        N = document,
        L = navigator,
        H = !1,
        $ = [n],
        R = [],
        W = [],
        z = [],
        U = !1,
        B = !1,
        q = !0,
        V = function() {
          var t = typeof N.getElementById != I && typeof N.getElementsByTagName != I && typeof N.createElement != I,
              e = L.userAgent.toLowerCase(),
              i = L.platform.toLowerCase(),
              n = /win/.test(i ? i : e),
              r = /mac/.test(i ? i : e),
              s = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
              o = !1,
              a = [0, 0, 0],
              l = null;
          if (typeof L.plugins != I && typeof L.plugins[E] == T) l = L.plugins[E].description, !l || typeof L.mimeTypes != I && L.mimeTypes[O] && !L.mimeTypes[O].enabledPlugin || (H = !0, o = !1, l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
          else if (typeof F.ActiveXObject != I) try {
            var u = new ActiveXObject(M);
            u && (l = u.GetVariable("$version"), l && (o = !0, l = l.split(" ")[1].split(","), a = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)]))
          } catch (c) {}
          return {
            w3: t,
            pv: a,
            wk: s,
            ie: o,
            win: n,
            mac: r
          }
        }();
    ! function() {
      V.w3 && ((typeof N.readyState != I && "complete" == N.readyState || typeof N.readyState == I && (N.getElementsByTagName("body")[0] || N.body)) && t(), U || (typeof N.addEventListener != I && N.addEventListener("DOMContentLoaded", t, !1), V.ie && V.win && (N.attachEvent(D, function() {
        "complete" == N.readyState && (N.detachEvent(D, arguments.callee), t())
      }), F == top && ! function() {
        if (!U) {
          try {
            N.documentElement.doScroll("left")
          } catch (e) {
            return void setTimeout(arguments.callee, 0)
          }
          t()
        }
      }()), V.wk && ! function() {
        return U ? void 0 : /loaded|complete/.test(N.readyState) ? void t() : void setTimeout(arguments.callee, 0)
      }(), i(t)))
    }(),
      function() {
        V.ie && V.win && window.attachEvent("onunload", function() {
          for (var t = z.length, e = 0; t > e; e++) z[e][0].detachEvent(z[e][1], z[e][2]);
          for (var i = W.length, n = 0; i > n; n++) f(W[n]);
          for (var r in V) V[r] = null;
          V = null;
          for (var s in swfobject) swfobject[s] = null;
          swfobject = null
        })
      }()
  }
  return {
    registerObject: function(t, e, i, n) {
      if (V.w3 && t && e) {
        var r = {};
        r.id = t, r.swfVersion = e, r.expressInstall = i, r.callbackFn = n, R[R.length] = r, b(t, !1)
      } else n && n({
        success: !1,
        id: t
      })
    },
    getObjectById: function(t) {
      return V.w3 ? o(t) : void 0
    },
    embedSWF: function(t, i, n, r, s, o, u, c, d, f) {
      var p = {
        success: !1,
        id: i
      };
      V.w3 && !(V.wk && V.wk < 312) && t && i && n && r && s ? (b(i, !1), e(function() {
        n += "", r += "";
        var e = {};
        if (d && typeof d === T)
          for (var g in d) e[g] = d[g];
        e.data = t, e.width = n, e.height = r;
        var m = {};
        if (c && typeof c === T)
          for (var v in c) m[v] = c[v];
        if (u && typeof u === T)
          for (var _ in u) typeof m.flashvars != I ? m.flashvars += "&" + _ + "=" + u[_] : m.flashvars = _ + "=" + u[_];
        if (y(s)) {
          var w = h(e, m, i);
          e.id == i && b(i, !0), p.success = !0, p.ref = w
        } else {
          if (o && a()) return e.data = o, void l(e, m, i, f);
          b(i, !0)
        }
        f && f(p)
      })) : f && f(p)
    },
    switchOffAutoHideShow: function() {
      q = !1
    },
    ua: V,
    getFlashPlayerVersion: function() {
      return {
        major: V.pv[0],
        minor: V.pv[1],
        release: V.pv[2]
      }
    },
    hasFlashPlayerVersion: y,
    createSWF: function(t, e, i) {
      return V.w3 ? h(t, e, i) : void 0
    },
    showExpressInstall: function(t, e, i, n) {
      V.w3 && a() && l(t, e, i, n)
    },
    removeSWF: function(t) {
      V.w3 && f(t)
    },
    createCSS: function(t, e, i, n) {
      V.w3 && _(t, e, i, n)
    },
    addDomLoadEvent: e,
    addLoadEvent: i,
    getQueryParamValue: function(t) {
      var e = N.location.search || N.location.hash;
      if (e) {
        if (/\?/.test(e) && (e = e.split("?")[1]), null == t) return w(e);
        for (var i = e.split("&"), n = 0; n < i.length; n++)
          if (i[n].substring(0, i[n].indexOf("=")) == t) return w(i[n].substring(i[n].indexOf("=") + 1))
      }
      return ""
    },
    expressInstallCallback: function() {
      if (B) {
        var t = g(j);
        t && x && (t.parentNode.replaceChild(x, t), k && (b(k, !0), V.ie && V.win && (x.style.display = "block")), P && P(A)), B = !1
      }
    }
  }
}();
/*!
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
! function(t, e, i) {
  "$:nomunge";

  function n(n, r) {
    function s(e) {
      t(o).each(function() {
        var i = t(this);
        this === e.target || i.has(e.target).length || i.triggerHandler(r, [e.target])
      })
    }
    r = r || n + i;
    var o = t(),
        a = n + "." + r + "-special-event";
    t.event.special[r] = {
      setup: function() {
        o = o.add(this), 1 === o.length && t(e).bind(a, s)
      },
      teardown: function() {
        o = o.not(this), 0 === o.length && t(e).unbind(a)
      },
      add: function(t) {
        var e = t.handler;
        t.handler = function(t, i) {
          t.target = i, e.apply(this, arguments)
        }
      }
    }
  }
  t.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "), function(t) {
    n(t)
  }), n("focusin", "focus" + i), n("focusout", "blur" + i), t.addOutsideEvent = n
}(jQuery, document, "outside"), $(function() {
  if (!$.duped("$.ui.dialog.extensions") && $.ui && $.ui.dialog) {
    var t = {
      open: $.ui.dialog.prototype.open,
      close: $.ui.dialog.prototype.close
    };
    $.extend($.ui.dialog.prototype.options, {
      clickoutsideCloses: !1,
      blockUI: !1
    }), $.extend($.ui.dialog.prototype, {
      open: function() {
        if (this.options.blockUI && !this.options.modal && $.blockUI({
          ignoreIfBlocked: !0,
          bindEvents: !1,
          baseZ: 999,
          onBlock: _.bind(function() {
            t.open.call(this)
          }, this)
        }), this.options.clickoutsideCloses) {
          var e = this;
          this.element.on("clickoutside.ui-extensions", function() {
            e.element.off("clickoutside.ui-extensions"), e.close.call(e)
          })
        }
        this.options.blockUI || t.open.call(this)
      },
      close: function() {
        return this.element.off(".ui-extensions"), this.options.blockUI && $.unblockUI(), t.close.call(this)
      }
    })
  }
}),
  /*!
   * jQuery UI 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI
   */
  function(t, e) {
    function i(e, i) {
      var r = e.nodeName.toLowerCase();
      return "area" === r ? (i = e.parentNode, r = i.name, e.href && r && "map" === i.nodeName.toLowerCase() ? (e = t("img[usemap=#" + r + "]")[0], !!e && n(e)) : !1) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" == r ? e.href || i : i) && n(e)
    }

    function n(e) {
      return !t(e).parents().andSelf().filter(function() {
        return "hidden" === t.curCSS(this, "visibility") || t.expr.filters.hidden(this)
      }).length
    }
    t.ui = t.ui || {}, t.ui.version || (t.extend(t.ui, {
      version: "1.8.16",
      keyCode: {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91
      }
    }), t.fn.extend({
      propAttr: t.fn.prop || t.fn.attr,
      _focus: t.fn.focus,
      focus: function(e, i) {
        return "number" == typeof e ? this.each(function() {
          var n = this;
          setTimeout(function() {
            t(n).focus(), i && i.call(n)
          }, e)
        }) : this._focus.apply(this, arguments)
      },
      scrollParent: function() {
        var e;
        return e = t.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
          return /(relative|absolute|fixed)/.test(t.curCSS(this, "position", 1)) && /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1))
        }).eq(0) : this.parents().filter(function() {
          return /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1))
        }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
      },
      zIndex: function(i) {
        if (i !== e) return this.css("zIndex", i);
        if (this.length) {
          i = t(this[0]);
          for (var n; i.length && i[0] !== document;) {
            if (n = i.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (n = parseInt(i.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
            i = i.parent()
          }
        }
        return 0
      },
      disableSelection: function() {
        return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
          t.preventDefault()
        })
      },
      enableSelection: function() {
        return this.unbind(".ui-disableSelection")
      }
    }), t.each(["Width", "Height"], function(i, n) {
      function r(e, i, n, r) {
        return t.each(s, function() {
          i -= parseFloat(t.curCSS(e, "padding" + this, !0)) || 0, n && (i -= parseFloat(t.curCSS(e, "border" + this + "Width", !0)) || 0), r && (i -= parseFloat(t.curCSS(e, "margin" + this, !0)) || 0)
        }), i
      }
      var s = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
          o = n.toLowerCase(),
          a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
          };
      t.fn["inner" + n] = function(i) {
        return i === e ? a["inner" + n].call(this) : this.each(function() {
          t(this).css(o, r(this, i) + "px")
        })
      }, t.fn["outer" + n] = function(e, i) {
        return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function() {
          t(this).css(o, r(this, e, !0, i) + "px")
        })
      }
    }), t.extend(t.expr[":"], {
      data: function(e, i, n) {
        return !!t.data(e, n[3])
      },
      focusable: function(e) {
        return i(e, !isNaN(t.attr(e, "tabindex")))
      },
      tabbable: function(e) {
        var n = t.attr(e, "tabindex"),
            r = isNaN(n);
        return (r || n >= 0) && i(e, !r)
      }
    }), t(function() {
      var e = document.body,
          i = e.appendChild(i = document.createElement("div"));
      t.extend(i.style, {
        minHeight: "100px",
        height: "auto",
        padding: 0,
        borderWidth: 0
      }), t.support.minHeight = 100 === i.offsetHeight, t.support.selectstart = "onselectstart" in i, e.removeChild(i).style.display = "none"
    }), t.extend(t.ui, {
      plugin: {
        add: function(e, i, n) {
          e = t.ui[e].prototype;
          for (var r in n) e.plugins[r] = e.plugins[r] || [], e.plugins[r].push([i, n[r]])
        },
        call: function(t, e, i) {
          if ((e = t.plugins[e]) && t.element[0].parentNode)
            for (var n = 0; n < e.length; n++) t.options[e[n][0]] && e[n][1].apply(t.element, i)
        }
      },
      contains: function(t, e) {
        return document.compareDocumentPosition ? 16 & t.compareDocumentPosition(e) : t !== e && t.contains(e)
      },
      hasScroll: function(e, i) {
        if ("hidden" === t(e).css("overflow")) return !1;
        i = i && "left" === i ? "scrollLeft" : "scrollTop";
        var n = !1;
        return e[i] > 0 ? !0 : (e[i] = 1, n = e[i] > 0, e[i] = 0, n)
      },
      isOverAxis: function(t, e, i) {
        return t > e && e + i > t
      },
      isOver: function(e, i, n, r, s, o) {
        return t.ui.isOverAxis(e, n, s) && t.ui.isOverAxis(i, r, o)
      }
    }))
  }(jQuery),
  /*!
   * jQuery UI Widget 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Widget
   */
  function(t, e) {
    if (t.cleanData) {
      var i = t.cleanData;
      t.cleanData = function(e) {
        for (var n, r = 0; null != (n = e[r]); r++) try {
          t(n).triggerHandler("remove")
        } catch (s) {}
        i(e)
      }
    } else {
      var n = t.fn.remove;
      t.fn.remove = function(e, i) {
        return this.each(function() {
          return i || (!e || t.filter(e, [this]).length) && t("*", this).add([this]).each(function() {
            try {
              t(this).triggerHandler("remove")
            } catch (e) {}
          }), n.call(t(this), e, i)
        })
      }
    }
    t.widget = function(e, i, n) {
      var r, s = e.split(".")[0];
      e = e.split(".")[1], r = s + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][r] = function(i) {
        return !!t.data(i, e)
      }, t[s] = t[s] || {}, t[s][e] = function(t, e) {
        arguments.length && this._createWidget(t, e)
      }, i = new i, i.options = t.extend(!0, {}, i.options), t[s][e].prototype = t.extend(!0, i, {
        namespace: s,
        widgetName: e,
        widgetEventPrefix: t[s][e].prototype.widgetEventPrefix || e,
        widgetBaseClass: r
      }, n), t.widget.bridge(e, t[s][e])
    }, t.widget.bridge = function(i, n) {
      t.fn[i] = function(r) {
        var s = "string" == typeof r,
            o = Array.prototype.slice.call(arguments, 1),
            a = this;
        return r = !s && o.length ? t.extend.apply(null, [!0, r].concat(o)) : r, s && "_" === r.charAt(0) ? a : (this.each(s ? function() {
          var n = t.data(this, i),
              s = n && t.isFunction(n[r]) ? n[r].apply(n, o) : n;
          return s !== n && s !== e ? (a = s, !1) : void 0
        } : function() {
          var e = t.data(this, i);
          e ? e.option(r || {})._init() : t.data(this, i, new n(r, this))
        }), a)
      }
    }, t.Widget = function(t, e) {
      arguments.length && this._createWidget(t, e)
    }, t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      options: {
        disabled: !1
      },
      _createWidget: function(e, i) {
        t.data(i, this.widgetName, this), this.element = t(i), this.options = t.extend(!0, {}, this.options, this._getCreateOptions(), e);
        var n = this;
        this.element.bind("remove." + this.widgetName, function() {
          n.destroy()
        }), this._create(), this._trigger("create"), this._init()
      },
      _getCreateOptions: function() {
        return t.metadata && t.metadata.get(this.element[0])[this.widgetName]
      },
      _create: function() {},
      _init: function() {},
      destroy: function() {
        this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
      },
      widget: function() {
        return this.element
      },
      option: function(i, n) {
        var r = i;
        if (0 === arguments.length) return t.extend({}, this.options);
        if ("string" == typeof i) {
          if (n === e) return this.options[i];
          r = {}, r[i] = n
        }
        return this._setOptions(r), this
      },
      _setOptions: function(e) {
        var i = this;
        return t.each(e, function(t, e) {
          i._setOption(t, e)
        }), this
      },
      _setOption: function(t, e) {
        return this.options[t] = e, "disabled" === t && this.widget()[e ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", e), this
      },
      enable: function() {
        return this._setOption("disabled", !1)
      },
      disable: function() {
        return this._setOption("disabled", !0)
      },
      _trigger: function(e, i, n) {
        var r = this.options[e];
        if (i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), n = n || {}, i.originalEvent) {
          e = t.event.props.length;
          for (var s; e;) s = t.event.props[--e], i[s] = i.originalEvent[s]
        }
        return this.element.trigger(i, n), !(t.isFunction(r) && r.call(this.element[0], i, n) === !1 || i.isDefaultPrevented())
      }
    }
  }(jQuery),
  /*!
   * jQuery UI Mouse 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Mouse
   *
   * Depends:
   *	jquery.ui.widget.js
   */
  function(t) {
    var e = !1;
    t(document).mouseup(function() {
      e = !1
    }), t.widget("ui.mouse", {
      options: {
        cancel: ":input,option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function() {
        var e = this;
        this.element.bind("mousedown." + this.widgetName, function(t) {
          return e._mouseDown(t)
        }).bind("click." + this.widgetName, function(i) {
          return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
        }), this.started = !1
      },
      _mouseDestroy: function() {
        this.element.unbind("." + this.widgetName)
      },
      _mouseDown: function(i) {
        if (!e) {
          this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
          var n = this,
              r = 1 == i.which,
              s = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
          return r && !s && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
            n.mouseDelayMet = !0
          }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
            return n._mouseMove(t)
          }, this._mouseUpDelegate = function(t) {
            return n._mouseUp(t)
          }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0)) : !0
        }
      },
      _mouseMove: function(e) {
        return !t.browser.msie || document.documentMode >= 9 || e.button ? this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1) ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted) : this._mouseUp(e)
      },
      _mouseUp: function(e) {
        return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target == this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
      },
      _mouseDistanceMet: function(t) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
      },
      _mouseDelayMet: function() {
        return this.mouseDelayMet
      },
      _mouseStart: function() {},
      _mouseDrag: function() {},
      _mouseStop: function() {},
      _mouseCapture: function() {
        return !0
      }
    })
  }(jQuery),
  /*
   * jQuery UI Position 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Position
   */
  function(t) {
    t.ui = t.ui || {};
    var e = /left|center|right/,
        i = /top|center|bottom/,
        n = t.fn.position,
        r = t.fn.offset;
    t.fn.position = function(r) {
      if (!r || !r.of) return n.apply(this, arguments);
      r = t.extend({}, r);
      var s, o, a, l = t(r.of),
          u = l[0],
          c = (r.collision || "flip").split(" "),
          h = r.offset ? r.offset.split(" ") : [0, 0];
      return 9 === u.nodeType ? (s = l.width(), o = l.height(), a = {
        top: 0,
        left: 0
      }) : u.setTimeout ? (s = l.width(), o = l.height(), a = {
        top: l.scrollTop(),
        left: l.scrollLeft()
      }) : u.preventDefault ? (r.at = "left top", s = o = 0, a = {
        top: r.of.pageY,
        left: r.of.pageX
      }) : (s = l.outerWidth(), o = l.outerHeight(), a = l.offset()), t.each(["my", "at"], function() {
        var t = (r[this] || "").split(" ");
        1 === t.length && (t = e.test(t[0]) ? t.concat(["center"]) : i.test(t[0]) ? ["center"].concat(t) : ["center", "center"]), t[0] = e.test(t[0]) ? t[0] : "center", t[1] = i.test(t[1]) ? t[1] : "center", r[this] = t
      }), 1 === c.length && (c[1] = c[0]), h[0] = parseInt(h[0], 10) || 0, 1 === h.length && (h[1] = h[0]), h[1] = parseInt(h[1], 10) || 0, "right" === r.at[0] ? a.left += s : "center" === r.at[0] && (a.left += s / 2), "bottom" === r.at[1] ? a.top += o : "center" === r.at[1] && (a.top += o / 2), a.left += h[0], a.top += h[1], this.each(function() {
        var e, i = t(this),
            n = i.outerWidth(),
            l = i.outerHeight(),
            u = parseInt(t.curCSS(this, "marginLeft", !0)) || 0,
            d = parseInt(t.curCSS(this, "marginTop", !0)) || 0,
            f = n + u + (parseInt(t.curCSS(this, "marginRight", !0)) || 0),
            p = l + d + (parseInt(t.curCSS(this, "marginBottom", !0)) || 0),
            g = t.extend({}, a);
        "right" === r.my[0] ? g.left -= n : "center" === r.my[0] && (g.left -= n / 2), "bottom" === r.my[1] ? g.top -= l : "center" === r.my[1] && (g.top -= l / 2), g.left = Math.round(g.left), g.top = Math.round(g.top), e = {
          left: g.left - u,
          top: g.top - d
        }, t.each(["left", "top"], function(i, a) {
          t.ui.position[c[i]] && t.ui.position[c[i]][a](g, {
            targetWidth: s,
            targetHeight: o,
            elemWidth: n,
            elemHeight: l,
            collisionPosition: e,
            collisionWidth: f,
            collisionHeight: p,
            offset: h,
            my: r.my,
            at: r.at
          })
        }), t.fn.bgiframe && i.bgiframe(), i.offset(t.extend(g, {
          using: r.using
        }))
      })
    }, t.ui.position = {
      fit: {
        left: function(e, i) {
          var n = t(window);
          n = i.collisionPosition.left + i.collisionWidth - n.width() - n.scrollLeft(), e.left = n > 0 ? e.left - n : Math.max(e.left - i.collisionPosition.left, e.left)
        },
        top: function(e, i) {
          var n = t(window);
          n = i.collisionPosition.top + i.collisionHeight - n.height() - n.scrollTop(), e.top = n > 0 ? e.top - n : Math.max(e.top - i.collisionPosition.top, e.top)
        }
      },
      flip: {
        left: function(e, i) {
          if ("center" !== i.at[0]) {
            var n = t(window);
            n = i.collisionPosition.left + i.collisionWidth - n.width() - n.scrollLeft();
            var r = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                s = "left" === i.at[0] ? i.targetWidth : -i.targetWidth,
                o = -2 * i.offset[0];
            e.left += i.collisionPosition.left < 0 ? r + s + o : n > 0 ? r + s + o : 0
          }
        },
        top: function(e, i) {
          if ("center" !== i.at[1]) {
            var n = t(window);
            n = i.collisionPosition.top + i.collisionHeight - n.height() - n.scrollTop();
            var r = "top" === i.my[1] ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                s = "top" === i.at[1] ? i.targetHeight : -i.targetHeight,
                o = -2 * i.offset[1];
            e.top += i.collisionPosition.top < 0 ? r + s + o : n > 0 ? r + s + o : 0
          }
        }
      }
    }, t.offset.setOffset || (t.offset.setOffset = function(e, i) {
      /static/.test(t.curCSS(e, "position")) && (e.style.position = "relative");
      var n = t(e),
          r = n.offset(),
          s = parseInt(t.curCSS(e, "top", !0), 10) || 0,
          o = parseInt(t.curCSS(e, "left", !0), 10) || 0;
      r = {
        top: i.top - r.top + s,
        left: i.left - r.left + o
      }, "using" in i ? i.using.call(e, r) : n.css(r)
    }, t.fn.offset = function(e) {
      var i = this[0];
      return i && i.ownerDocument ? e ? this.each(function() {
        t.offset.setOffset(this, e)
      }) : r.call(this) : null
    })
  }(jQuery),
  /*
   * jQuery UI Draggable 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Draggables
   *
   * Depends:
   *	jquery.ui.core.js
   *	jquery.ui.mouse.js
   *	jquery.ui.widget.js
   */
  function(t) {
    t.widget("ui.draggable", t.ui.mouse, {
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1
      },
      _create: function() {
        "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
      },
      destroy: function() {
        return this.element.data("draggable") ? (this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this) : void 0
      },
      _mouseCapture: function(e) {
        var i = this.options;
        return this.helper || i.disabled || t(e.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(e), this.handle ? (i.iframeFix && t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
          t('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
            width: this.offsetWidth + "px",
            height: this.offsetHeight + "px",
            position: "absolute",
            opacity: "0.001",
            zIndex: 1e3
          }).css(t(this).offset()).appendTo("body")
        }), !0) : !1)
      },
      _mouseStart: function(e) {
        var i = this.options;
        return this.helper = this._createHelper(e), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        }, t.extend(this.offset, {
          click: {
            left: e.pageX - this.offset.left,
            top: e.pageY - this.offset.top
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
      },
      _mouseDrag: function(e, i) {
        if (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
          if (i = this._uiHash(), this._trigger("drag", e, i) === !1) return this._mouseUp({}), !1;
          this.position = i.position
        }
        return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
      },
      _mouseStop: function(e) {
        var i = !1;
        if (t.ui.ddmanager && !this.options.dropBehaviour && (i = t.ui.ddmanager.drop(this, e)), this.dropped && (i = this.dropped, this.dropped = !1), !(this.element[0] && this.element[0].parentNode || "original" != this.options.helper)) return !1;
        if ("invalid" == this.options.revert && !i || "valid" == this.options.revert && i || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, i)) {
          var n = this;
          t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
            n._trigger("stop", e) !== !1 && n._clear()
          })
        } else this._trigger("stop", e) !== !1 && this._clear();
        return !1
      },
      _mouseUp: function(e) {
        return this.options.iframeFix === !0 && t("div.ui-draggable-iframeFix").each(function() {
          this.parentNode.removeChild(this)
        }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
      },
      cancel: function() {
        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
      },
      _getHandle: function(e) {
        var i = this.options.handle && t(this.options.handle, this.element).length ? !1 : !0;
        return t(this.options.handle, this.element).find("*").andSelf().each(function() {
          this == e.target && (i = !0)
        }), i
      },
      _createHelper: function(e) {
        var i = this.options;
        return e = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" == i.helper ? this.element.clone().removeAttr("id") : this.element, e.parents("body").length || e.appendTo("parent" == i.appendTo ? this.element[0].parentNode : i.appendTo), e[0] != this.element[0] && !/(fixed|absolute)/.test(e.css("position")) && e.css("position", "absolute"), e
      },
      _adjustOffsetFromHelper: function(e) {
        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
          left: +e[0],
          top: +e[1] || 0
        }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
      },
      _getParentOffset: function() {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie) && (e = {
          top: 0,
          left: 0
        }), {
          top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
        }
      },
      _getRelativeOffset: function() {
        if ("relative" == this.cssPosition) {
          var t = this.element.position();
          return {
            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
          }
        }
        return {
          top: 0,
          left: 0
        }
      },
      _cacheMargins: function() {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0
        }
      },
      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        }
      },
      _setContainment: function() {
        var e = this.options;
        if ("parent" == e.containment && (e.containment = this.helper[0].parentNode), ("document" == e.containment || "window" == e.containment) && (this.containment = ["document" == e.containment ? 0 : t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == e.containment ? 0 : t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == e.containment ? 0 : t(window).scrollLeft()) + t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == e.containment ? 0 : t(window).scrollTop()) + (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || e.containment.constructor == Array) e.containment.constructor == Array && (this.containment = e.containment);
        else {
          e = t(e.containment);
          var i = e[0];
          if (i) {
            e.offset();
            var n = "hidden" != t(i).css("overflow");
            this.containment = [(parseInt(t(i).css("borderLeftWidth"), 10) || 0) + (parseInt(t(i).css("paddingLeft"), 10) || 0), (parseInt(t(i).css("borderTopWidth"), 10) || 0) + (parseInt(t(i).css("paddingTop"), 10) || 0), (n ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t(i).css("borderLeftWidth"), 10) || 0) - (parseInt(t(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (n ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t(i).css("borderTopWidth"), 10) || 0) - (parseInt(t(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = e
          }
        }
      },
      _convertPositionTo: function(e, i) {
        i || (i = this.position), e = "absolute" == e ? 1 : -1;
        var n = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
            r = /(html|body)/i.test(n[0].tagName);
        return {
          top: i.top + this.offset.relative.top * e + this.offset.parent.top * e - (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : n.scrollTop()) * e),
          left: i.left + this.offset.relative.left * e + this.offset.parent.left * e - (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : n.scrollLeft()) * e)
        }
      },
      _generatePosition: function(e) {
        var i = this.options,
            n = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
            r = /(html|body)/i.test(n[0].tagName),
            s = e.pageX,
            o = e.pageY;
        if (this.originalPosition) {
          var a;
          this.containment && (this.relative_container ? (a = this.relative_container.offset(), a = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]) : a = this.containment, e.pageX - this.offset.click.left < a[0] && (s = a[0] + this.offset.click.left), e.pageY - this.offset.click.top < a[1] && (o = a[1] + this.offset.click.top), e.pageX - this.offset.click.left > a[2] && (s = a[2] + this.offset.click.left), e.pageY - this.offset.click.top > a[3] && (o = a[3] + this.offset.click.top)), i.grid && (o = i.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY, o = a && (o - this.offset.click.top < a[1] || o - this.offset.click.top > a[3]) ? o - this.offset.click.top < a[1] ? o + i.grid[1] : o - i.grid[1] : o, s = i.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX, s = a && (s - this.offset.click.left < a[0] || s - this.offset.click.left > a[2]) ? s - this.offset.click.left < a[0] ? s + i.grid[0] : s - i.grid[0] : s)
        }
        return {
          top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : n.scrollTop()),
          left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : n.scrollLeft())
        }
      },
      _clear: function() {
        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
      },
      _trigger: function(e, i, n) {
        return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n]), "drag" == e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, n)
      },
      plugins: {},
      _uiHash: function() {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs
        }
      }
    }), t.extend(t.ui.draggable, {
      version: "1.8.16"
    }), t.ui.plugin.add("draggable", "connectToSortable", {
      start: function(e, i) {
        var n = t(this).data("draggable"),
            r = n.options,
            s = t.extend({}, i, {
              item: n.element
            });
        n.sortables = [], t(r.connectToSortable).each(function() {
          var i = t.data(this, "sortable");
          i && !i.options.disabled && (n.sortables.push({
            instance: i,
            shouldRevert: i.options.revert
          }), i.refreshPositions(), i._trigger("activate", e, s))
        })
      },
      stop: function(e, i) {
        var n = t(this).data("draggable"),
            r = t.extend({}, i, {
              item: n.element
            });
        t.each(n.sortables, function() {
          this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" == n.options.helper && this.instance.currentItem.css({
            top: "auto",
            left: "auto"
          })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, r))
        })
      },
      drag: function(e, i) {
        var n = t(this).data("draggable"),
            r = this;
        t.each(n.sortables, function() {
          this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(r).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
            return i.helper[0]
          }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", e), n.dropped = !1)
        })
      }
    }), t.ui.plugin.add("draggable", "cursor", {
      start: function() {
        var e = t("body"),
            i = t(this).data("draggable").options;
        e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
      },
      stop: function() {
        var e = t(this).data("draggable").options;
        e._cursor && t("body").css("cursor", e._cursor)
      }
    }), t.ui.plugin.add("draggable", "opacity", {
      start: function(e, i) {
        e = t(i.helper), i = t(this).data("draggable").options, e.css("opacity") && (i._opacity = e.css("opacity")), e.css("opacity", i.opacity)
      },
      stop: function(e, i) {
        e = t(this).data("draggable").options, e._opacity && t(i.helper).css("opacity", e._opacity)
      }
    }), t.ui.plugin.add("draggable", "scroll", {
      start: function() {
        var e = t(this).data("draggable");
        e.scrollParent[0] != document && "HTML" != e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
      },
      drag: function(e) {
        var i = t(this).data("draggable"),
            n = i.options,
            r = !1;
        i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (n.axis && "x" == n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = r = i.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = r = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" == n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = r = i.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = r = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" == n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), n.axis && "y" == n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), r !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
      }
    }), t.ui.plugin.add("draggable", "snap", {
      start: function() {
        var e = t(this).data("draggable"),
            i = e.options;
        e.snapElements = [], t(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function() {
          var i = t(this),
              n = i.offset();
          this != e.element[0] && e.snapElements.push({
            item: this,
            width: i.outerWidth(),
            height: i.outerHeight(),
            top: n.top,
            left: n.left
          })
        })
      },
      drag: function(e, i) {
        for (var n = t(this).data("draggable"), r = n.options, s = r.snapTolerance, o = i.offset.left, a = o + n.helperProportions.width, l = i.offset.top, u = l + n.helperProportions.height, c = n.snapElements.length - 1; c >= 0; c--) {
          var h = n.snapElements[c].left,
              d = h + n.snapElements[c].width,
              f = n.snapElements[c].top,
              p = f + n.snapElements[c].height;
          if (o > h - s && d + s > o && l > f - s && p + s > l || o > h - s && d + s > o && u > f - s && p + s > u || a > h - s && d + s > a && l > f - s && p + s > l || a > h - s && d + s > a && u > f - s && p + s > u) {
            if ("inner" != r.snapMode) {
              var g = Math.abs(f - u) <= s,
                  m = Math.abs(p - l) <= s,
                  v = Math.abs(h - a) <= s,
                  y = Math.abs(d - o) <= s;
              g && (i.position.top = n._convertPositionTo("relative", {
                top: f - n.helperProportions.height,
                left: 0
              }).top - n.margins.top), m && (i.position.top = n._convertPositionTo("relative", {
                top: p,
                left: 0
              }).top - n.margins.top), v && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h - n.helperProportions.width
              }).left - n.margins.left), y && (i.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: d
              }).left - n.margins.left)
            }
            var _ = g || m || v || y;
            "outer" != r.snapMode && (g = Math.abs(f - l) <= s, m = Math.abs(p - u) <= s, v = Math.abs(h - o) <= s, y = Math.abs(d - a) <= s, g && (i.position.top = n._convertPositionTo("relative", {
              top: f,
              left: 0
            }).top - n.margins.top), m && (i.position.top = n._convertPositionTo("relative", {
              top: p - n.helperProportions.height,
              left: 0
            }).top - n.margins.top), v && (i.position.left = n._convertPositionTo("relative", {
              top: 0,
              left: h
            }).left - n.margins.left), y && (i.position.left = n._convertPositionTo("relative", {
              top: 0,
              left: d - n.helperProportions.width
            }).left - n.margins.left)), !n.snapElements[c].snapping && (g || m || v || y || _) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
              snapItem: n.snapElements[c].item
            })), n.snapElements[c].snapping = g || m || v || y || _
          } else n.snapElements[c].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
            snapItem: n.snapElements[c].item
          })), n.snapElements[c].snapping = !1
        }
      }
    }), t.ui.plugin.add("draggable", "stack", {
      start: function() {
        var e = t(this).data("draggable").options;
        if (e = t.makeArray(t(e.stack)).sort(function(e, i) {
          return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
        }), e.length) {
          var i = parseInt(e[0].style.zIndex) || 0;
          t(e).each(function(t) {
            this.style.zIndex = i + t
          }), this[0].style.zIndex = i + e.length
        }
      }
    }), t.ui.plugin.add("draggable", "zIndex", {
      start: function(e, i) {
        e = t(i.helper), i = t(this).data("draggable").options, e.css("zIndex") && (i._zIndex = e.css("zIndex")), e.css("zIndex", i.zIndex)
      },
      stop: function(e, i) {
        e = t(this).data("draggable").options, e._zIndex && t(i.helper).css("zIndex", e._zIndex)
      }
    })
  }(jQuery),
  /*
   * jQuery UI Droppable 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Droppables
   *
   * Depends:
   *	jquery.ui.core.js
   *	jquery.ui.widget.js
   *	jquery.ui.mouse.js
   *	jquery.ui.draggable.js
   */
  function(t) {
    t.widget("ui.droppable", {
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect"
      },
      _create: function() {
        var e = this.options,
            i = e.accept;
        this.isover = 0, this.isout = 1, this.accept = t.isFunction(i) ? i : function(t) {
          return t.is(i)
        }, this.proportions = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight
        }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
      },
      destroy: function() {
        for (var e = t.ui.ddmanager.droppables[this.options.scope], i = 0; i < e.length; i++) e[i] == this && e.splice(i, 1);
        return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
      },
      _setOption: function(e, i) {
        "accept" == e && (this.accept = t.isFunction(i) ? i : function(t) {
          return t.is(i)
        }), t.Widget.prototype._setOption.apply(this, arguments)
      },
      _activate: function(e) {
        var i = t.ui.ddmanager.current;
        this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
      },
      _deactivate: function(e) {
        var i = t.ui.ddmanager.current;
        this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
      },
      _over: function(e) {
        var i = t.ui.ddmanager.current;
        i && (i.currentItem || i.element)[0] != this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
      },
      _out: function(e) {
        var i = t.ui.ddmanager.current;
        i && (i.currentItem || i.element)[0] != this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
      },
      _drop: function(e, i) {
        var n = i || t.ui.ddmanager.current;
        if (!n || (n.currentItem || n.element)[0] == this.element[0]) return !1;
        var r = !1;
        return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
          var e = t.data(this, "droppable");
          return e.options.greedy && !e.options.disabled && e.options.scope == n.options.scope && e.accept.call(e.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(e, {
            offset: e.element.offset()
          }), e.options.tolerance) ? (r = !0, !1) : void 0
        }), r ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1
      },
      ui: function(t) {
        return {
          draggable: t.currentItem || t.element,
          helper: t.helper,
          position: t.position,
          offset: t.positionAbs
        }
      }
    }), t.extend(t.ui.droppable, {
      version: "1.8.16"
    }), t.ui.intersect = function(e, i, n) {
      if (!i.offset) return !1;
      var r = (e.positionAbs || e.position.absolute).left,
          s = r + e.helperProportions.width,
          o = (e.positionAbs || e.position.absolute).top,
          a = o + e.helperProportions.height,
          l = i.offset.left,
          u = l + i.proportions.width,
          c = i.offset.top,
          h = c + i.proportions.height;
      switch (n) {
        case "fit":
          return r >= l && u >= s && o >= c && h >= a;
        case "intersect":
          return l < r + e.helperProportions.width / 2 && s - e.helperProportions.width / 2 < u && c < o + e.helperProportions.height / 2 && a - e.helperProportions.height / 2 < h;
        case "pointer":
          return t.ui.isOver((e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, c, l, i.proportions.height, i.proportions.width);
        case "touch":
          return (o >= c && h >= o || a >= c && h >= a || c > o && a > h) && (r >= l && u >= r || s >= l && u >= s || l > r && s > u);
        default:
          return !1
      }
    }, t.ui.ddmanager = {
      current: null,
      droppables: {
        "default": []
      },
      prepareOffsets: function(e, i) {
        var n = t.ui.ddmanager.droppables[e.options.scope] || [],
            r = i ? i.type : null,
            s = (e.currentItem || e.element).find(":data(droppable)").andSelf(),
            o = 0;
        t: for (; o < n.length; o++)
          if (!(n[o].options.disabled || e && !n[o].accept.call(n[o].element[0], e.currentItem || e.element))) {
            for (var a = 0; a < s.length; a++)
              if (s[a] == n[o].element[0]) {
                n[o].proportions.height = 0;
                continue t
              }
            n[o].visible = "none" != n[o].element.css("display"), n[o].visible && ("mousedown" == r && n[o]._activate.call(n[o], i), n[o].offset = n[o].element.offset(), n[o].proportions = {
              width: n[o].element[0].offsetWidth,
              height: n[o].element[0].offsetHeight
            })
          }
      },
      drop: function(e, i) {
        var n = !1;
        return t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
          this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (n = n || this._drop.call(this, i)), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, i)))
        }), n
      },
      dragStart: function(e, i) {
        e.element.parents(":not(body,html)").bind("scroll.droppable", function() {
          e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        })
      },
      drag: function(e, i) {
        e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
          if (!this.options.disabled && !this.greedyChild && this.visible) {
            var n = t.ui.intersect(e, this, this.options.tolerance);
            if (n = n || 1 != this.isover ? n && 0 == this.isover ? "isover" : null : "isout") {
              var r;
              if (this.options.greedy) {
                var s = this.element.parents(":data(droppable):eq(0)");
                s.length && (r = t.data(s[0], "droppable"), r.greedyChild = "isover" == n ? 1 : 0)
              }
              r && "isover" == n && (r.isover = 0, r.isout = 1, r._out.call(r, i)), this[n] = 1, this["isout" == n ? "isover" : "isout"] = 0, this["isover" == n ? "_over" : "_out"].call(this, i), r && "isout" == n && (r.isout = 0, r.isover = 1, r._over.call(r, i))
            }
          }
        })
      },
      dragStop: function(e, i) {
        e.element.parents(":not(body,html)").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
      }
    }
  }(jQuery),
  /*
   * jQuery UI Sortable 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Sortables
   *
   * Depends:
   *	jquery.ui.core.js
   *	jquery.ui.mouse.js
   *	jquery.ui.widget.js
   */
  function(t) {
    t.widget("ui.sortable", t.ui.mouse, {
      widgetEventPrefix: "sort",
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3
      },
      _create: function() {
        var t = this.options;
        this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit()
      },
      destroy: function() {
        this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable"), this._mouseDestroy();
        for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData("sortable-item");
        return this
      },
      _setOption: function(e, i) {
        "disabled" === e ? (this.options[e] = i, this.widget()[i ? "addClass" : "removeClass"]("ui-sortable-disabled")) : t.Widget.prototype._setOption.apply(this, arguments)
      },
      _mouseCapture: function(e, i) {
        if (this.reverting) return !1;
        if (this.options.disabled || "static" == this.options.type) return !1;
        this._refreshItems(e);
        var n = null,
            r = this;
        if (t(e.target).parents().each(function() {
          return t.data(this, "sortable-item") == r ? (n = t(this), !1) : void 0
        }), t.data(e.target, "sortable-item") == r && (n = t(e.target)), !n) return !1;
        if (this.options.handle && !i) {
          var s = !1;
          if (t(this.options.handle, n).find("*").andSelf().each(function() {
            this == e.target && (s = !0)
          }), !s) return !1
        }
        return this.currentItem = n, this._removeCurrentsFromItems(), !0
      },
      _mouseStart: function(e, i, n) {
        i = this.options;
        var r = this;
        if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        }, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), t.extend(this.offset, {
          click: {
            left: e.pageX - this.offset.left,
            top: e.pageY - this.offset.top
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this.domPosition = {
          prev: this.currentItem.prev()[0],
          parent: this.currentItem.parent()[0]
        }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), i.containment && this._setContainment(), i.cursor && (t("body").css("cursor") && (this._storedCursor = t("body").css("cursor")), t("body").css("cursor", i.cursor)), i.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", i.opacity)), i.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", i.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
          for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, r._uiHash(this));
        return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
      },
      _mouseDrag: function(e) {
        if (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
          var i = this.options,
              n = !1;
          this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = n = this.scrollParent[0].scrollTop + i.scrollSpeed : e.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = n = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = n = this.scrollParent[0].scrollLeft + i.scrollSpeed : e.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = n = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (e.pageY - t(document).scrollTop() < i.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - i.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < i.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + i.scrollSpeed)), e.pageX - t(document).scrollLeft() < i.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - i.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < i.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + i.scrollSpeed))), n !== !1 && t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)
        }
        for (this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) {
          n = this.items[i];
          var r = n.item[0],
              s = this._intersectsWithPointer(n);
          if (s && r != this.currentItem[0] && this.placeholder[1 == s ? "next" : "prev"]()[0] != r && !t.ui.contains(this.placeholder[0], r) && ("semi-dynamic" == this.options.type ? !t.ui.contains(this.element[0], r) : !0)) {
            if (this.direction = 1 == s ? "down" : "up", "pointer" != this.options.tolerance && !this._intersectsWithSides(n)) break;
            this._rearrange(e, n), this._trigger("change", e, this._uiHash());
            break
          }
        }
        return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
      },
      _mouseStop: function(e, i) {
        if (e) {
          if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
            var n = this;
            i = n.placeholder.offset(), n.reverting = !0, t(this.helper).animate({
              left: i.left - this.offset.parent.left - n.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
              top: i.top - this.offset.parent.top - n.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
            }, parseInt(this.options.revert, 10) || 500, function() {
              n._clear(e)
            })
          } else this._clear(e, i);
          return !1
        }
      },
      cancel: function() {
        var e = this;
        if (this.dragging) {
          this._mouseUp({
            target: null
          }), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
          for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, e._uiHash(this)), this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, e._uiHash(this)), this.containers[i].containerCache.over = 0)
        }
        return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
          helper: null,
          dragging: !1,
          reverting: !1,
          _noFinalSort: null
        }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
      },
      serialize: function(e) {
        var i = this._getItemsAsjQuery(e && e.connected),
            n = [];
        return e = e || {}, t(i).each(function() {
          var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
          i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
        }), !n.length && e.key && n.push(e.key + "="), n.join("&")
      },
      toArray: function(e) {
        var i = this._getItemsAsjQuery(e && e.connected),
            n = [];
        return e = e || {}, i.each(function() {
          n.push(t(e.item || this).attr(e.attribute || "id") || "")
        }), n
      },
      _intersectsWith: function(t) {
        var e = this.positionAbs.left,
            i = e + this.helperProportions.width,
            n = this.positionAbs.top,
            r = n + this.helperProportions.height,
            s = t.left,
            o = s + t.width,
            a = t.top,
            l = a + t.height,
            u = this.offset.click.top,
            c = this.offset.click.left;
        return u = n + u > a && l > n + u && e + c > s && o > e + c, "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? u : s < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < o && a < n + this.helperProportions.height / 2 && r - this.helperProportions.height / 2 < l
      },
      _intersectsWithPointer: function(e) {
        var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height);
        e = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width), i = i && e, e = this._getDragVerticalDirection();
        var n = this._getDragHorizontalDirection();
        return i ? this.floating ? n && "right" == n || "down" == e ? 2 : 1 : e && ("down" == e ? 2 : 1) : !1
      },
      _intersectsWithSides: function(e) {
        var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height);
        e = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width);
        var n = this._getDragVerticalDirection(),
            r = this._getDragHorizontalDirection();
        return this.floating && r ? "right" == r && e || "left" == r && !e : n && ("down" == n && i || "up" == n && !i)
      },
      _getDragVerticalDirection: function() {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 != t && (t > 0 ? "down" : "up")
      },
      _getDragHorizontalDirection: function() {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 != t && (t > 0 ? "right" : "left")
      },
      refresh: function(t) {
        return this._refreshItems(t), this.refreshPositions(), this
      },
      _connectWith: function() {
        var t = this.options;
        return t.connectWith.constructor == String ? [t.connectWith] : t.connectWith
      },
      _getItemsAsjQuery: function(e) {
        var i = [],
            n = [],
            r = this._connectWith();
        if (r && e)
          for (e = r.length - 1; e >= 0; e--)
            for (var s = t(r[e]), o = s.length - 1; o >= 0; o--) {
              var a = t.data(s[o], "sortable");
              a && a != this && !a.options.disabled && n.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a])
            }
        for (n.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), e = n.length - 1; e >= 0; e--) n[e][0].each(function() {
          i.push(this)
        });
        return t(i)
      },
      _removeCurrentsFromItems: function() {
        for (var t = this.currentItem.find(":data(sortable-item)"), e = 0; e < this.items.length; e++)
          for (var i = 0; i < t.length; i++) t[i] == this.items[e].item[0] && this.items.splice(e, 1)
      },
      _refreshItems: function(e) {
        this.items = [], this.containers = [this];
        var i = this.items,
            n = [
              [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                item: this.currentItem
              }) : t(this.options.items, this.element), this]
            ],
            r = this._connectWith();
        if (r)
          for (var s = r.length - 1; s >= 0; s--)
            for (var o = t(r[s]), a = o.length - 1; a >= 0; a--) {
              var l = t.data(o[a], "sortable");
              l && l != this && !l.options.disabled && (n.push([t.isFunction(l.options.items) ? l.options.items.call(l.element[0], e, {
                item: this.currentItem
              }) : t(l.options.items, l.element), l]), this.containers.push(l))
            }
        for (s = n.length - 1; s >= 0; s--)
          for (e = n[s][1], r = n[s][0], a = 0, o = r.length; o > a; a++) l = t(r[a]), l.data("sortable-item", e), i.push({
            item: l,
            instance: e,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          })
      },
      refreshPositions: function(e) {
        this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
        for (var i = this.items.length - 1; i >= 0; i--) {
          var n = this.items[i];
          if (n.instance == this.currentContainer || !this.currentContainer || n.item[0] == this.currentItem[0]) {
            var r = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item;
            e || (n.width = r.outerWidth(), n.height = r.outerHeight()), r = r.offset(), n.left = r.left, n.top = r.top
          }
        }
        if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--) r = this.containers[i].element.offset(), this.containers[i].containerCache.left = r.left, this.containers[i].containerCache.top = r.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
        return this
      },
      _createPlaceholder: function(e) {
        var i = e || this,
            n = i.options;
        if (!n.placeholder || n.placeholder.constructor == String) {
          var r = n.placeholder;
          n.placeholder = {
            element: function() {
              var e = t(document.createElement(i.currentItem[0].nodeName)).addClass(r || i.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
              return r || (e.style.visibility = "hidden"), e
            },
            update: function(t, e) {
              (!r || n.forcePlaceholderSize) && (e.height() || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)))
            }
          }
        }
        i.placeholder = t(n.placeholder.element.call(i.element, i.currentItem)), i.currentItem.after(i.placeholder), n.placeholder.update(i, i.placeholder)
      },
      _contactContainers: function(e) {
        for (var i = null, n = null, r = this.containers.length - 1; r >= 0; r--) t.ui.contains(this.currentItem[0], this.containers[r].element[0]) || (this._intersectsWith(this.containers[r].containerCache) ? i && t.ui.contains(this.containers[r].element[0], i.element[0]) || (i = this.containers[r], n = r) : this.containers[r].containerCache.over && (this.containers[r]._trigger("out", e, this._uiHash(this)), this.containers[r].containerCache.over = 0));
        if (i)
          if (1 === this.containers.length) this.containers[n]._trigger("over", e, this._uiHash(this)), this.containers[n].containerCache.over = 1;
          else if (this.currentContainer != this.containers[n]) {
            i = 1e4, r = null;
            for (var s = this.positionAbs[this.containers[n].floating ? "left" : "top"], o = this.items.length - 1; o >= 0; o--)
              if (t.ui.contains(this.containers[n].element[0], this.items[o].item[0])) {
                var a = this.items[o][this.containers[n].floating ? "left" : "top"];
                Math.abs(a - s) < i && (i = Math.abs(a - s), r = this.items[o])
              }(r || this.options.dropOnEmpty) && (this.currentContainer = this.containers[n], r ? this._rearrange(e, r, null, !0) : this._rearrange(e, null, this.containers[n].element, !0), this._trigger("change", e, this._uiHash()), this.containers[n]._trigger("change", e, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", e, this._uiHash(this)), this.containers[n].containerCache.over = 1)
          }
      },
      _createHelper: function(e) {
        var i = this.options;
        return e = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" == i.helper ? this.currentItem.clone() : this.currentItem, e.parents("body").length || t("parent" != i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(e[0]), e[0] == this.currentItem[0] && (this._storedCSS = {
          width: this.currentItem[0].style.width,
          height: this.currentItem[0].style.height,
          position: this.currentItem.css("position"),
          top: this.currentItem.css("top"),
          left: this.currentItem.css("left")
        }), ("" == e[0].style.width || i.forceHelperSize) && e.width(this.currentItem.width()), ("" == e[0].style.height || i.forceHelperSize) && e.height(this.currentItem.height()), e
      },
      _adjustOffsetFromHelper: function(e) {
        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
          left: +e[0],
          top: +e[1] || 0
        }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
      },
      _getParentOffset: function() {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie) && (e = {
          top: 0,
          left: 0
        }), {
          top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
        }
      },
      _getRelativeOffset: function() {
        if ("relative" == this.cssPosition) {
          var t = this.currentItem.position();
          return {
            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
          }
        }
        return {
          top: 0,
          left: 0
        }
      },
      _cacheMargins: function() {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0
        }
      },
      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        }
      },
      _setContainment: function() {
        var e = this.options;
        if ("parent" == e.containment && (e.containment = this.helper[0].parentNode), ("document" == e.containment || "window" == e.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(e.containment)) {
          var i = t(e.containment)[0];
          e = t(e.containment).offset();
          var n = "hidden" != t(i).css("overflow");
          this.containment = [e.left + (parseInt(t(i).css("borderLeftWidth"), 10) || 0) + (parseInt(t(i).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(t(i).css("borderTopWidth"), 10) || 0) + (parseInt(t(i).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (n ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t(i).css("borderLeftWidth"), 10) || 0) - (parseInt(t(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (n ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t(i).css("borderTopWidth"), 10) || 0) - (parseInt(t(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
        }
      },
      _convertPositionTo: function(e, i) {
        i || (i = this.position), e = "absolute" == e ? 1 : -1;
        var n = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
            r = /(html|body)/i.test(n[0].tagName);
        return {
          top: i.top + this.offset.relative.top * e + this.offset.parent.top * e - (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : n.scrollTop()) * e),
          left: i.left + this.offset.relative.left * e + this.offset.parent.left * e - (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : n.scrollLeft()) * e)
        }
      },
      _generatePosition: function(e) {
        var i = this.options,
            n = "absolute" != this.cssPosition || this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
            r = /(html|body)/i.test(n[0].tagName);
        "relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
        var s = e.pageX,
            o = e.pageY;
        return this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), i.grid && (o = this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1], o = this.containment && (o - this.offset.click.top < this.containment[1] || o - this.offset.click.top > this.containment[3]) ? o - this.offset.click.top < this.containment[1] ? o + i.grid[1] : o - i.grid[1] : o, s = this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0], s = this.containment && (s - this.offset.click.left < this.containment[0] || s - this.offset.click.left > this.containment[2]) ? s - this.offset.click.left < this.containment[0] ? s + i.grid[0] : s - i.grid[0] : s)), {
          top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : n.scrollTop()),
          left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : n.scrollLeft())
        }
      },
      _rearrange: function(t, e, i, n) {
        i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
        var r = this,
            s = this.counter;
        window.setTimeout(function() {
          s == r.counter && r.refreshPositions(!n)
        }, 0)
      },
      _clear: function(e, i) {
        this.reverting = !1;
        var n = [];
        if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
          for (var r in this._storedCSS)("auto" == this._storedCSS[r] || "static" == this._storedCSS[r]) && (this._storedCSS[r] = "");
          this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
        } else this.currentItem.show();
        if (this.fromOutside && !i && n.push(function(t) {
          this._trigger("receive", t, this._uiHash(this.fromOutside))
        }), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || i || n.push(function(t) {
          this._trigger("update", t, this._uiHash())
        }), !t.ui.contains(this.element[0], this.currentItem[0]))
          for (i || n.push(function(t) {
            this._trigger("remove", t, this._uiHash())
          }), r = this.containers.length - 1; r >= 0; r--) t.ui.contains(this.containers[r].element[0], this.currentItem[0]) && !i && (n.push(function(t) {
            return function(e) {
              t._trigger("receive", e, this._uiHash(this))
            }
          }.call(this, this.containers[r])), n.push(function(t) {
            return function(e) {
              t._trigger("update", e, this._uiHash(this))
            }
          }.call(this, this.containers[r])));
        for (r = this.containers.length - 1; r >= 0; r--) i || n.push(function(t) {
          return function(e) {
            t._trigger("deactivate", e, this._uiHash(this))
          }
        }.call(this, this.containers[r])), this.containers[r].containerCache.over && (n.push(function(t) {
          return function(e) {
            t._trigger("out", e, this._uiHash(this))
          }
        }.call(this, this.containers[r])), this.containers[r].containerCache.over = 0);
        if (this._storedCursor && t("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
          if (!i) {
            for (this._trigger("beforeStop", e, this._uiHash()), r = 0; r < n.length; r++) n[r].call(this, e);
            this._trigger("stop", e, this._uiHash())
          }
          return !1
        }
        if (i || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !i) {
          for (r = 0; r < n.length; r++) n[r].call(this, e);
          this._trigger("stop", e, this._uiHash())
        }
        return this.fromOutside = !1, !0
      },
      _trigger: function() {
        t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
      },
      _uiHash: function(e) {
        var i = e || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || t([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: e ? e.element : null
        }
      }
    }), t.extend(t.ui.sortable, {
      version: "1.8.16"
    })
  }(jQuery),
  /*
   * jQuery UI Dialog 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Dialog
   *
   * Depends:
   *	jquery.ui.core.js
   *	jquery.ui.widget.js
   *  jquery.ui.button.js
   *	jquery.ui.draggable.js
   *	jquery.ui.mouse.js
   *	jquery.ui.position.js
   *	jquery.ui.resizable.js
   */
  function(t, e) {
    var i = {
          buttons: !0,
          height: !0,
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
          width: !0
        },
        n = {
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0
        },
        r = t.attrFn || {
          val: !0,
          css: !0,
          html: !0,
          text: !0,
          data: !0,
          width: !0,
          height: !0,
          offset: !0,
          click: !0
        };
    t.widget("ui.dialog", {
      options: {
        autoOpen: !0,
        buttons: {},
        closeOnEscape: !0,
        closeText: "close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: !1,
        maxWidth: !1,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          collision: "fit",
          using: function(e) {
            var i = t(this).css(e).offset().top;
            0 > i && t(this).css("top", e.top - i)
          }
        },
        resizable: !0,
        show: null,
        stack: !0,
        title: "",
        width: 300,
        zIndex: 1e3
      },
      _create: function() {
        this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
        var e = this,
            i = e.options,
            n = i.title || "&#160;",
            r = t.ui.dialog.getTitleId(e.element),
            s = (e.uiDialog = t("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + i.dialogClass).css({
              zIndex: i.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function(n) {
              i.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === t.ui.keyCode.ESCAPE && (e.close(n), n.preventDefault())
            }).attr({
              role: "dialog",
              "aria-labelledby": r
            }).mousedown(function(t) {
              e.moveToTop(!1, t)
            });
        e.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s);
        var o = (e.uiDialogTitlebar = t("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(s),
            a = t('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
              a.addClass("ui-state-hover")
            }, function() {
              a.removeClass("ui-state-hover")
            }).focus(function() {
              a.addClass("ui-state-focus")
            }).blur(function() {
              a.removeClass("ui-state-focus")
            }).click(function(t) {
              return e.close(t), !1
            }).appendTo(o);
        (e.uiDialogTitlebarCloseText = t("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(a), t("<span></span>").addClass("ui-dialog-title").attr("id", r).html(n).prependTo(o), t.isFunction(i.beforeclose) && !t.isFunction(i.beforeClose) && (i.beforeClose = i.beforeclose), o.find("*").add(o).disableSelection(), i.draggable && t.fn.draggable && e._makeDraggable(), i.resizable && t.fn.resizable && e._makeResizable(), e._createButtons(i.buttons), e._isOpen = !1, t.fn.bgiframe && s.bgiframe()
      },
      _init: function() {
        this.options.autoOpen && this.open()
      },
      destroy: function() {
        var t = this;
        return t.overlay && t.overlay.destroy(), t.uiDialog.hide(), t.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), t.uiDialog.remove(), t.originalTitle && t.element.attr("title", t.originalTitle), t
      },
      widget: function() {
        return this.uiDialog
      },
      close: function(e) {
        var i, n, r = this;
        return !1 !== r._trigger("beforeClose", e) ? (r.overlay && r.overlay.destroy(), r.uiDialog.unbind("keypress.ui-dialog"), r._isOpen = !1, r.options.hide ? r.uiDialog.hide(r.options.hide, function() {
          r._trigger("close", e)
        }) : (r.uiDialog.hide(), r._trigger("close", e)), t.ui.dialog.overlay.resize(), r.options.modal && (i = 0, t(".ui-dialog").each(function() {
          this !== r.uiDialog[0] && (n = t(this).css("z-index"), isNaN(n) || (i = Math.max(i, n)))
        }), t.ui.dialog.maxZ = i), r) : void 0
      },
      isOpen: function() {
        return this._isOpen
      },
      moveToTop: function(e, i) {
        var n = this,
            r = n.options;
        return r.modal && !e || !r.stack && !r.modal ? n._trigger("focus", i) : (r.zIndex > t.ui.dialog.maxZ && (t.ui.dialog.maxZ = r.zIndex), n.overlay && (t.ui.dialog.maxZ += 1, n.overlay.$el.css("z-index", t.ui.dialog.overlay.maxZ = t.ui.dialog.maxZ)), e = {
          scrollTop: n.element.scrollTop(),
          scrollLeft: n.element.scrollLeft()
        }, t.ui.dialog.maxZ += 1, n.uiDialog.css("z-index", t.ui.dialog.maxZ), n.element.attr(e), n._trigger("focus", i), n)
      },
      open: function() {
        if (!this._isOpen) {
          var e = this,
              i = e.options,
              n = e.uiDialog;
          return e.overlay = i.modal ? new t.ui.dialog.overlay(e) : null, e._size(), e._position(i.position), n.show(i.show), e.moveToTop(!0), i.modal && n.bind("keypress.ui-dialog", function(e) {
            if (e.keyCode === t.ui.keyCode.TAB) {
              var i = t(":tabbable", this),
                  n = i.filter(":first");
              if (i = i.filter(":last"), e.target === i[0] && !e.shiftKey) return n.focus(1), !1;
              if (e.target === n[0] && e.shiftKey) return i.focus(1), !1
            }
          }), t(e.element.find(":tabbable").get().concat(n.find(".ui-dialog-buttonpane :tabbable").get().concat(n.get()))).eq(0).focus(), e._isOpen = !0, e._trigger("open"), e
        }
      },
      _createButtons: function(e) {
        var i = this,
            n = !1,
            s = t("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            o = t("<div></div>").addClass("ui-dialog-buttonset").appendTo(s);
        i.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof e && null !== e && t.each(e, function() {
          return !(n = !0)
        }), n && (t.each(e, function(e, n) {
          n = t.isFunction(n) ? {
            click: n,
            text: e
          } : n;
          var s = t('<button type="button"></button>').click(function() {
            n.click.apply(i.element[0], arguments)
          }).appendTo(o);
          t.each(n, function(t, e) {
            "click" !== t && (t in r ? s[t](e) : s.attr(t, e))
          }), t.fn.button && s.button()
        }), s.appendTo(i.uiDialog))
      },
      _makeDraggable: function() {
        function e(t) {
          return {
            position: t.position,
            offset: t.offset
          }
        }
        var i, n = this,
            r = n.options,
            s = t(document);
        n.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function(s, o) {
            i = "auto" === r.height ? "auto" : t(this).height(), t(this).height(t(this).height()).addClass("ui-dialog-dragging"), n._trigger("dragStart", s, e(o))
          },
          drag: function(t, i) {
            n._trigger("drag", t, e(i))
          },
          stop: function(o, a) {
            r.position = [a.position.left - s.scrollLeft(), a.position.top - s.scrollTop()], t(this).removeClass("ui-dialog-dragging").height(i), n._trigger("dragStop", o, e(a)), t.ui.dialog.overlay.resize()
          }
        })
      },
      _makeResizable: function(i) {
        function n(t) {
          return {
            originalPosition: t.originalPosition,
            originalSize: t.originalSize,
            position: t.position,
            size: t.size
          }
        }
        i = i === e ? this.options.resizable : i;
        var r = this,
            s = r.options,
            o = r.uiDialog.css("position");
        i = "string" == typeof i ? i : "n,e,s,w,se,sw,ne,nw", r.uiDialog.resizable({
          cancel: ".ui-dialog-content",
          containment: "document",
          alsoResize: r.element,
          maxWidth: s.maxWidth,
          maxHeight: s.maxHeight,
          minWidth: s.minWidth,
          minHeight: r._minHeight(),
          handles: i,
          start: function(e, i) {
            t(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", e, n(i))
          },
          resize: function(t, e) {
            r._trigger("resize", t, n(e))
          },
          stop: function(e, i) {
            t(this).removeClass("ui-dialog-resizing"), s.height = t(this).height(), s.width = t(this).width(), r._trigger("resizeStop", e, n(i)), t.ui.dialog.overlay.resize()
          }
        }).css("position", o).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
      },
      _minHeight: function() {
        var t = this.options;
        return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
      },
      _position: function(e) {
        var i, n = [],
            r = [0, 0];
        e ? (("string" == typeof e || "object" == typeof e && "0" in e) && (n = e.split ? e.split(" ") : [e[0], e[1]], 1 === n.length && (n[1] = n[0]), t.each(["left", "top"], function(t, e) {
          +n[t] === n[t] && (r[t] = n[t], n[t] = e)
        }), e = {
          my: n.join(" "),
          at: n.join(" "),
          offset: r.join(" ")
        }), e = t.extend({}, t.ui.dialog.prototype.options.position, e)) : e = t.ui.dialog.prototype.options.position, (i = this.uiDialog.is(":visible")) || this.uiDialog.show(), this.uiDialog.css({
          top: 0,
          left: 0
        }).position(t.extend({
          of: window
        }, e)), i || this.uiDialog.hide()
      },
      _setOptions: function(e) {
        var r = this,
            s = {},
            o = !1;
        t.each(e, function(t, e) {
          r._setOption(t, e), t in i && (o = !0), t in n && (s[t] = e)
        }), o && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
      },
      _setOption: function(e, i) {
        var n = this,
            r = n.uiDialog;
        switch (e) {
          case "beforeclose":
            e = "beforeClose";
            break;
          case "buttons":
            n._createButtons(i);
            break;
          case "closeText":
            n.uiDialogTitlebarCloseText.text("" + i);
            break;
          case "dialogClass":
            r.removeClass(n.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + i);
            break;
          case "disabled":
            i ? r.addClass("ui-dialog-disabled") : r.removeClass("ui-dialog-disabled");
            break;
          case "draggable":
            var s = r.is(":data(draggable)");
            s && !i && r.draggable("destroy"), !s && i && n._makeDraggable();
            break;
          case "position":
            n._position(i);
            break;
          case "resizable":
            (s = r.is(":data(resizable)")) && !i && r.resizable("destroy"), s && "string" == typeof i && r.resizable("option", "handles", i), !s && i !== !1 && n._makeResizable(i);
            break;
          case "title":
            t(".ui-dialog-title", n.uiDialogTitlebar).html("" + (i || "&#160;"))
        }
        t.Widget.prototype._setOption.apply(n, arguments)
      },
      _size: function() {
        var e, i, n = this.options,
            r = this.uiDialog.is(":visible");
        this.element.show().css({
          width: "auto",
          minHeight: 0,
          height: 0
        }), n.minWidth > n.width && (n.width = n.minWidth), e = this.uiDialog.css({
          height: "auto",
          width: n.width
        }).height(), i = Math.max(0, n.minHeight - e), "auto" === n.height ? t.support.minHeight ? this.element.css({
          minHeight: i,
          height: "auto"
        }) : (this.uiDialog.show(), n = this.element.css("height", "auto").height(), r || this.uiDialog.hide(), this.element.height(Math.max(n, i))) : this.element.height(Math.max(n.height - e, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
      }
    }), t.extend(t.ui.dialog, {
      version: "1.8.16",
      uuid: 0,
      maxZ: 0,
      getTitleId: function(t) {
        return t = t.attr("id"), t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
      },
      overlay: function(e) {
        this.$el = t.ui.dialog.overlay.create(e)
      }
    }), t.extend(t.ui.dialog.overlay, {
      instances: [],
      oldInstances: [],
      maxZ: 0,
      events: t.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(t) {
        return t + ".dialog-overlay"
      }).join(" "),
      create: function(e) {
        0 === this.instances.length && (setTimeout(function() {
          t.ui.dialog.overlay.instances.length && t(document).bind(t.ui.dialog.overlay.events, function(e) {
            return t(e.target).zIndex() < t.ui.dialog.overlay.maxZ ? !1 : void 0
          })
        }, 1), t(document).bind("keydown.dialog-overlay", function(i) {
          e.options.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === t.ui.keyCode.ESCAPE && (e.close(i), i.preventDefault())
        }), t(window).bind("resize.dialog-overlay", t.ui.dialog.overlay.resize));
        var i = (this.oldInstances.pop() || t("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
          width: this.width(),
          height: this.height()
        });
        return t.fn.bgiframe && i.bgiframe(), this.instances.push(i), i
      },
      destroy: function(e) {
        var i = t.inArray(e, this.instances); - 1 != i && this.oldInstances.push(this.instances.splice(i, 1)[0]), 0 === this.instances.length && t([document, window]).unbind(".dialog-overlay"), e.remove();
        var n = 0;
        t.each(this.instances, function() {
          n = Math.max(n, this.css("z-index"))
        }), this.maxZ = n
      },
      height: function() {
        var e, i;
        return t.browser.msie && t.browser.version < 7 ? (e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), i = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), i > e ? t(window).height() + "px" : e + "px") : t(document).height() + "px"
      },
      width: function() {
        var e, i;
        return t.browser.msie ? (e = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), i = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), i > e ? t(window).width() + "px" : e + "px") : t(document).width() + "px"
      },
      resize: function() {
        var e = t([]);
        t.each(t.ui.dialog.overlay.instances, function() {
          e = e.add(this)
        }), e.css({
          width: 0,
          height: 0
        }).css({
          width: t.ui.dialog.overlay.width(),
          height: t.ui.dialog.overlay.height()
        })
      }
    }), t.extend(t.ui.dialog.overlay.prototype, {
      destroy: function() {
        t.ui.dialog.overlay.destroy(this.$el)
      }
    })
  }(jQuery),
  /*
   * jQuery UI Slider 1.8.16
   *
   * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   * http://jquery.org/license
   *
   * http://docs.jquery.com/UI/Slider
   *
   * Depends:
   *	jquery.ui.core.js
   *	jquery.ui.mouse.js
   *	jquery.ui.widget.js
   */
  function(t) {
    t.widget("ui.slider", t.ui.mouse, {
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null
      },
      _create: function() {
        var e = this,
            i = this.options,
            n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
            r = i.values && i.values.length || 1,
            s = [];
        this._mouseSliding = this._keySliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = t([]), i.range && (i.range === !0 && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && 2 !== i.values.length && (i.values = [i.values[0], i.values[0]])), this.range = t("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === i.range || "max" === i.range ? " ui-slider-range-" + i.range : "")));
        for (var o = n.length; r > o; o += 1) s.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
        this.handles = n.add(t(s.join("")).appendTo(e.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(t) {
          t.preventDefault()
        }).hover(function() {
          i.disabled || t(this).addClass("ui-state-hover")
        }, function() {
          t(this).removeClass("ui-state-hover")
        }).focus(function() {
          i.disabled ? t(this).blur() : (t(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), t(this).addClass("ui-state-focus"))
        }).blur(function() {
          t(this).removeClass("ui-state-focus")
        }), this.handles.each(function(e) {
          t(this).data("index.ui-slider-handle", e)
        }), this.handles.keydown(function(i) {
          var n, r, s, o = !0,
              a = t(this).data("index.ui-slider-handle");
          if (!e.options.disabled) {
            switch (i.keyCode) {
              case t.ui.keyCode.HOME:
              case t.ui.keyCode.END:
              case t.ui.keyCode.PAGE_UP:
              case t.ui.keyCode.PAGE_DOWN:
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (o = !1, !e._keySliding && (e._keySliding = !0, t(this).addClass("ui-state-active"), n = e._start(i, a), n === !1)) return
            }
            switch (s = e.options.step, n = r = e.options.values && e.options.values.length ? e.values(a) : e.value(), i.keyCode) {
              case t.ui.keyCode.HOME:
                r = e._valueMin();
                break;
              case t.ui.keyCode.END:
                r = e._valueMax();
                break;
              case t.ui.keyCode.PAGE_UP:
                r = e._trimAlignValue(n + (e._valueMax() - e._valueMin()) / 5);
                break;
              case t.ui.keyCode.PAGE_DOWN:
                r = e._trimAlignValue(n - (e._valueMax() - e._valueMin()) / 5);
                break;
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
                if (n === e._valueMax()) return;
                r = e._trimAlignValue(n + s);
                break;
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (n === e._valueMin()) return;
                r = e._trimAlignValue(n - s)
            }
            return e._slide(i, a, r), o
          }
        }).keyup(function(i) {
          var n = t(this).data("index.ui-slider-handle");
          e._keySliding && (e._keySliding = !1, e._stop(i, n), e._change(i, n), t(this).removeClass("ui-state-active"))
        }), this._refreshValue(), this._animateOff = !1
      },
      destroy: function() {
        return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
      },
      _mouseCapture: function(e) {
        var i, n, r, s, o, a = this.options;
        return a.disabled ? !1 : (this.elementSize = {
          width: this.element.outerWidth(),
          height: this.element.outerHeight()
        }, this.elementOffset = this.element.offset(), i = this._normValueFromMouse({
          x: e.pageX,
          y: e.pageY
        }), n = this._valueMax() - this._valueMin() + 1, s = this, this.handles.each(function(e) {
          var a = Math.abs(i - s.values(e));
          n > a && (n = a, r = t(this), o = e)
        }), a.range === !0 && this.values(1) === a.min && (o += 1, r = t(this.handles[o])), this._start(e, o) === !1 ? !1 : (this._mouseSliding = !0, s._handleIndex = o, r.addClass("ui-state-active").focus(), a = r.offset(), this._clickOffset = t(e.target).parents().andSelf().is(".ui-slider-handle") ? {
          left: e.pageX - a.left - r.width() / 2,
          top: e.pageY - a.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
        } : {
          left: 0,
          top: 0
        }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, i), this._animateOff = !0))
      },
      _mouseStart: function() {
        return !0
      },
      _mouseDrag: function(t) {
        var e = this._normValueFromMouse({
          x: t.pageX,
          y: t.pageY
        });
        return this._slide(t, this._handleIndex, e), !1
      },
      _mouseStop: function(t) {
        return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._clickOffset = this._handleIndex = null, this._animateOff = !1
      },
      _detectOrientation: function() {
        this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
      },
      _normValueFromMouse: function(t) {
        var e;
        return "horizontal" === this.orientation ? (e = this.elementSize.width, t = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, t = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), e = t / e, e > 1 && (e = 1), 0 > e && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), this._trimAlignValue(this._valueMin() + e * t)
      },
      _start: function(t, e) {
        var i = {
          handle: this.handles[e],
          value: this.value()
        };
        return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
      },
      _slide: function(t, e, i) {
        var n;
        this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (n = this.values(), n[e] = i, t = this._trigger("slide", t, {
          handle: this.handles[e],
          value: i,
          values: n
        }), this.values(e ? 0 : 1), t !== !1 && this.values(e, i, !0))) : i !== this.value() && (t = this._trigger("slide", t, {
          handle: this.handles[e],
          value: i
        }), t !== !1 && this.value(i))
      },
      _stop: function(t, e) {
        var i = {
          handle: this.handles[e],
          value: this.value()
        };
        this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
      },
      _change: function(t, e) {
        if (!this._keySliding && !this._mouseSliding) {
          var i = {
            handle: this.handles[e],
            value: this.value()
          };
          this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("change", t, i)
        }
      },
      value: function(t) {
        return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value()
      },
      values: function(e, i) {
        var n, r, s;
        if (arguments.length > 1) this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e);
        else {
          if (!arguments.length) return this._values();
          if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
          for (n = this.options.values, r = arguments[0], s = 0; s < n.length; s += 1) n[s] = this._trimAlignValue(r[s]), this._change(null, s);
          this._refreshValue()
        }
      },
      _setOption: function(e, i) {
        var n, r = 0;
        switch (t.isArray(this.options.values) && (r = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
          case "disabled":
            i ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
            break;
          case "orientation":
            this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
            break;
          case "value":
            this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
            break;
          case "values":
            for (this._animateOff = !0, this._refreshValue(), n = 0; r > n; n += 1) this._change(null, n);
            this._animateOff = !1
        }
      },
      _value: function() {
        var t = this.options.value;
        return t = this._trimAlignValue(t)
      },
      _values: function(t) {
        var e, i;
        if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
        for (e = this.options.values.slice(), i = 0; i < e.length; i += 1) e[i] = this._trimAlignValue(e[i]);
        return e
      },
      _trimAlignValue: function(t) {
        if (t <= this._valueMin()) return this._valueMin();
        if (t >= this._valueMax()) return this._valueMax();
        var e = this.options.step > 0 ? this.options.step : 1,
            i = (t - this._valueMin()) % e;
        return t -= i, 2 * Math.abs(i) >= e && (t += i > 0 ? e : -e), parseFloat(t.toFixed(5))
      },
      _valueMin: function() {
        return this.options.min
      },
      _valueMax: function() {
        return this.options.max
      },
      _refreshValue: function() {
        var e, i, n, r, s, o = this.options.range,
            a = this.options,
            l = this,
            u = this._animateOff ? !1 : a.animate,
            c = {};
        this.options.values && this.options.values.length ? this.handles.each(function(n) {
          e = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%", t(this).stop(1, 1)[u ? "animate" : "css"](c, a.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[u ? "animate" : "css"]({
            left: e + "%"
          }, a.animate), 1 === n && l.range[u ? "animate" : "css"]({
            width: e - i + "%"
          }, {
            queue: !1,
            duration: a.animate
          })) : (0 === n && l.range.stop(1, 1)[u ? "animate" : "css"]({
            bottom: e + "%"
          }, a.animate), 1 === n && l.range[u ? "animate" : "css"]({
            height: e - i + "%"
          }, {
            queue: !1,
            duration: a.animate
          }))), i = e
        }) : (n = this.value(), r = this._valueMin(), s = this._valueMax(), e = s !== r ? (n - r) / (s - r) * 100 : 0, c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](c, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
          width: e + "%"
        }, a.animate), "max" === o && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
          width: 100 - e + "%"
        }, {
          queue: !1,
          duration: a.animate
        }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
          height: e + "%"
        }, a.animate), "max" === o && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
          height: 100 - e + "%"
        }, {
          queue: !1,
          duration: a.animate
        }))
      }
    }), t.extend(t.ui.slider, {
      version: "1.8.16"
    })
  }(jQuery),
  function(t) {
    t.fn.serializeJSON = function() {
      var e = {};
      return t.map(t(this).serializeArray(), function(t) {
        e[t.name] = t.value
      }), e
    }
  }(jQuery), ! function(t, e, i) {
  function n(t, i) {
    var n, r = e.createElement(t || "div");
    for (n in i) r[n] = i[n];
    return r
  }

  function r(t) {
    for (var e = 1, i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
    return t
  }

  function s(t, e, i, n) {
    var r = ["opacity", e, ~~(100 * t), i, n].join("-"),
        s = .01 + i / n * 100,
        o = Math.max(1 - (1 - t) / e * (100 - s), t),
        a = c.substring(0, c.indexOf("Animation")).toLowerCase(),
        l = a && "-" + a + "-" || "";
    return d[r] || (f.insertRule("@" + l + "keyframes " + r + "{0%{opacity:" + o + "}" + s + "%{opacity:" + t + "}" + (s + .01) + "%{opacity:1}" + (s + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + o + "}}", f.cssRules.length), d[r] = 1), r
  }

  function o(t, e) {
    var n, r, s = t.style;
    if (s[e] !== i) return e;
    for (e = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < h.length; r++)
      if (n = h[r] + e, s[n] !== i) return n
  }

  function a(t, e) {
    for (var i in e) t.style[o(t, i) || i] = e[i];
    return t
  }

  function l(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n) t[r] === i && (t[r] = n[r])
    }
    return t
  }

  function u(t) {
    for (var e = {
      x: t.offsetLeft,
      y: t.offsetTop
    }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
    return e
  }
  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */
  var c, h = ["webkit", "Moz", "ms", "O"],
  d = {},
  f = function() {
    var t = n("style", {
      type: "text/css"
    });
    return r(e.getElementsByTagName("head")[0], t), t.sheet || t.styleSheet
  }(),
  p = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    rotate: 0,
    corners: 1,
    color: "#000",
    speed: 1,
    trail: 100,
    opacity: .25,
    fps: 20,
    zIndex: 2e9,
    className: "spinner",
    top: "auto",
    left: "auto",
    position: "relative"
  },
  g = function m(t) {
    return this.spin ? void(this.opts = l(t || {}, m.defaults, p)) : new m(t)
  };
  g.defaults = {}, l(g.prototype, {
    spin: function(t) {
      this.stop();
      var e, i, r = this,
          s = r.opts,
          o = r.el = a(n(0, {
            className: s.className
          }), {
            position: s.position,
            width: 0,
            zIndex: s.zIndex
          }),
          l = s.radius + s.length + s.width;
      if (t && (t.insertBefore(o, t.firstChild || null), i = u(t), e = u(o), a(o, {
        left: ("auto" == s.left ? i.x - e.x + (t.offsetWidth >> 1) : parseInt(s.left, 10) + l) + "px",
        top: ("auto" == s.top ? i.y - e.y + (t.offsetHeight >> 1) : parseInt(s.top, 10) + l) + "px"
      })), o.setAttribute("aria-role", "progressbar"), r.lines(o, r.opts), !c) {
        var h = 0,
            d = s.fps,
            f = d / s.speed,
            p = (1 - s.opacity) / (f * s.trail / 100),
            g = f / s.lines;
        ! function m() {
          h++;
          for (var t = s.lines; t; t--) {
            var e = Math.max(1 - (h + t * g) % f * p, s.opacity);
            r.opacity(o, s.lines - t, e, s)
          }
          r.timeout = r.el && setTimeout(m, ~~(1e3 / d))
        }()
      }
      return r
    },
    stop: function() {
      var t = this.el;
      return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = i), this
    },
    lines: function(t, e) {
      function i(t, i) {
        return a(n(), {
          position: "absolute",
          width: e.length + e.width + "px",
          height: e.width + "px",
          background: t,
          boxShadow: i,
          transformOrigin: "left",
          transform: "rotate(" + ~~(360 / e.lines * l + e.rotate) + "deg) translate(" + e.radius + "px,0)",
          borderRadius: (e.corners * e.width >> 1) + "px"
        })
      }
      for (var o, l = 0; l < e.lines; l++) o = a(n(), {
        position: "absolute",
        top: 1 + ~(e.width / 2) + "px",
        transform: e.hwaccel ? "translate3d(0,0,0)" : "",
        opacity: e.opacity,
        animation: c && s(e.opacity, e.trail, l, e.lines) + " " + 1 / e.speed + "s linear infinite"
      }), e.shadow && r(o, a(i("#000", "0 0 4px #000"), {
        top: "2px"
      })), r(t, r(o, i(e.color, "0 0 1px rgba(0,0,0,.1)")));
      return t
    },
    opacity: function(t, e, i) {
      e < t.childNodes.length && (t.childNodes[e].style.opacity = i)
    }
  }),
    function() {
      function t(t, e) {
        return n("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', e)
      }
      var e = a(n("group"), {
        behavior: "url(#default#VML)"
      });
      !o(e, "transform") && e.adj ? (f.addRule(".spin-vml", "behavior:url(#default#VML)"), g.prototype.lines = function(e, i) {
        function n() {
          return a(t("group", {
            coordsize: u + " " + u,
            coordorigin: -l + " " + -l
          }), {
            width: u,
            height: u
          })
        }

        function s(e, s, o) {
          r(h, r(a(n(), {
            rotation: 360 / i.lines * e + "deg",
            left: ~~s
          }), r(a(t("roundrect", {
            arcsize: i.corners
          }), {
            width: l,
            height: i.width,
            left: i.radius,
            top: -i.width >> 1,
            filter: o
          }), t("fill", {
            color: i.color,
            opacity: i.opacity
          }), t("stroke", {
            opacity: 0
          }))))
        }
        var o, l = i.length + i.width,
            u = 2 * l,
            c = 2 * -(i.width + i.length) + "px",
            h = a(n(), {
              position: "absolute",
              top: c,
              left: c
            });
        if (i.shadow)
          for (o = 1; o <= i.lines; o++) s(o, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
        for (o = 1; o <= i.lines; o++) s(o);
        return r(e, h)
      }, g.prototype.opacity = function(t, e, i, n) {
        var r = t.firstChild;
        n = n.shadow && n.lines || 0, r && e + n < r.childNodes.length && (r = r.childNodes[e + n], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = i))
      }) : c = o(e, "animation")
    }(), "function" == typeof define && define.amd ? define(function() {
    return g
  }) : t.Spinner = g
}(window, document),
  function(t, e) {
    t.fn.spin = function(i) {
      return this.each(function() {
        var n = t(this),
            r = n.data();
        r.spinner && (r.spinner.stop(), delete r.spinner), i !== !1 && (r.spinner = new e(t.extend({
          color: n.css("color")
        }, i)).spin(this))
      }), this
    }
  }(jQuery, Spinner),
  function(t) {
    function e(t, e) {
      return this.stop().animate({
        top: t
      }, this.data("settings").duration, e)
    }

    function i() {
      return this.find(".errors").empty()
    }
    var n = {
          duration: 300,
          panelClass: ".panel",
          closeClass: ".panel-close",
          saveClass: ".panel-save",
          forceVisible: !1,
          spinOpt: {
            lines: 9,
            length: 7,
            width: 4,
            radius: 14,
            corners: 1,
            trail: 75,
            speed: 1.2,
            shadow: "on"
          }
        },
        r = [],
        s = {
          init: function(e) {
            var r = {},
                o = this.outerHeight(!0),
                a = this;
            return t.extend(!0, r, n, e), this.find(r.closeClass).unbind("click").click(function(e) {
              t(this).attr("disabled") || s.hide.call(a), e.preventDefault()
            }), r.save && this.find(r.saveClass).unbind("click").click(function(t) {
              t.preventDefault();
              var e = a.find(":input").serializeJSON();
              (!r.beforeSave || r.beforeSave.call(a, e)) && (i.call(a), r.save.call(a, e) && a.panel("hide"))
            }), this.data("initialized", !0), this.data("height", o), this.data("settings", r), this
          },
          wait: function(t) {
            var e = this.find(".wait");
            0 === e.length && (e = this.prepend('<div class="overlay wait"><div class="spin"></div></div>').find(".wait"));
            var i = e.is(":visible");
            return "undefined" == typeof t && (t = !i), t && !i ? e.fadeIn().find(".spin").spin(this.data("settings").spinOpt) : !t && i && (e.is(":animated") ? e.hide() : e.fadeOut(), e.find(".spin").spin(!1)), this.data("waiting", e.is(":visible"))
          },
          error: function(e) {
            var i = this.find(".errors");
            return 0 !== i.length && (i.empty(), "string" == typeof e && (e = [e]), t.each(e, function(t, e) {
              i.append("<li>" + e + "</li>")
            })), this
          },
          message: function(t, e, i) {
            var n = this,
                r = this.find(".message");
            0 === r.length && (r = this.prepend('<div class="overlay message"><h1></h1><p></p><div class="buttons"><button class="button main-button panel-save">OK</button></div></div>').find(".message"));
            var s = (r.is(":visible"), r.find("p")),
                o = r.find("h1"),
                a = r.find(".panel-save");
            return s.html(e), o.html(t), r.fadeIn(200, function() {
              n.data("waiting") && n.panel("wait", !1)
            }), a.click(function() {
              a.unbind("click"), "function" == typeof i && i.call(n) || i ? n.panel("hide", function() {
                r.hide(), s.empty(), o.empty()
              }) : (r.fadeOut(), s.empty(), o.empty())
            }), this
          },
          show: function(i) {
            var n, s = 0,
                o = 1;
            n = _.partition(r, function(e) {
              return t(e).is(".forced")
            });
            for (var a = 0; a < n[o].length; a++) t(n[o][a]).panel("hide");
            r = n[s], this.show(), r.push(this);
            try {
              this.data("settings").show.call(this)
            } catch (l) {}
            return e.call(this, "-" + this.data("height"), i)
          },
          hide: function(t) {
            i.call(this);
            try {
              this.data("settings").hide.call(this)
            } catch (n) {}
            var r = this;
            return e.call(this, 0, function() {
              r.data("settings").forceVisible || r.hide();
              try {
                t.call(r)
              } catch (e) {}
            })
          },
          toggle: function() {
            return s[this.is(":visible") ? "hide" : "show"].call(this)
          }
        };
    t.fn.panel = function(e) {
      return 0 === this.length ? t.error("unable to locate element") : e && "object" != typeof e ? s[e] ? ("undefined" == typeof this.data("initialized") && s.init.call(this, {}), s[e].apply(this, Array.prototype.slice.call(arguments, 1))) : void t.error("Method " + e + " does not exist on jQuery.panel") : s.init.apply(this, arguments)
    }
  }(jQuery),
  /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
   * Licensed under the MIT License (LICENSE.txt).
   *
   * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
   * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
   * Thanks to: Seamus Leahy for adding deltaX and deltaY
   *
   * Version: 3.0.6
   *
   * Requires: 1.2.2+
   */
  function(t) {
    function e(e) {
      var i = e || window.event,
          n = [].slice.call(arguments, 1),
          r = 0,
          s = 0,
          o = 0;
      return e = t.event.fix(i), e.type = "mousewheel", i.wheelDelta && (r = i.wheelDelta / 120), i.detail && (r = -i.detail / 3), o = r, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (o = 0, s = -1 * r), void 0 !== i.wheelDeltaY && (o = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (s = -1 * i.wheelDeltaX / 120), n.unshift(e, r, s, o), (t.event.dispatch || t.event.handle).apply(this, n)
    }
    var i = ["DOMMouseScroll", "mousewheel"];
    if (t.event.fixHooks)
      for (var n = i.length; n;) t.event.fixHooks[i[--n]] = t.event.mouseHooks;
    t.event.special.mousewheel = {
      setup: function() {
        if (this.addEventListener)
          for (var t = i.length; t;) this.addEventListener(i[--t], e, !1);
        else this.onmousewheel = e
      },
      teardown: function() {
        if (this.removeEventListener)
          for (var t = i.length; t;) this.removeEventListener(i[--t], e, !1);
        else this.onmousewheel = null
      }
    }, t.fn.extend({
      mousewheel: function(t) {
        return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
      },
      unmousewheel: function(t) {
        return this.unbind("mousewheel", t)
      }
    })
  }(jQuery), NS("AudioAddict.API").Channels = function(t, e, i) {
  if (!(this instanceof arguments.callee)) return $.log(LogPrefix() + "AudioAddict.API.Channels: Forcing instantiation"), new AudioAddict.API.Channels(t, e, i);
  $.log(LogPrefix() + "AudioAddict.API.Channels: Instantiating", arguments);
  var n, r = NS("AudioAddict.API"),
      s = t + "/" + e + "/",
      o = "channel_filters",
      a = "jsonp",
      l = i || {};
  this.getTimeout = function() {
    return "undefined" == typeof n && (n = l.timeout >= 100 ? n = 1e3 * n : r.Default.timeout), n
  }, this.allUrl = function() {
    return s + o + "/key/default." + a
  }, this.channelFilterUrl = function(t) {
    return s + o + "/key/" + t + "." + a
  }, this.getAll = function(t, e) {
    $.log(LogPrefix() + "AudioAddict.API.Channels.getAll(): Fetching all channels\u2026"), $.ajax({
      url: this.allUrl(),
      dataType: "jsonp",
      jsonpCallback: "_API_Channels_getAll",
      timeout: this.getTimeout(),
      success: t,
      error: e || function(t, e) {
        "timeout" == e && $.log(LogPrefix() + "AudioAddict.API.Channels.getAll(): Timed out!", t, e)
      }
    })
  }, this.getChannelFilter = function(t, e, i) {
    $.log(LogPrefix() + "AudioAddict.API.Channels.getChannelFilter(): Fetching channels for filter {" + t + "}\u2026"), $.ajax({
      url: this.channelFilterUrl(t),
      dataType: "jsonp",
      jsonpCallback: "_API_Channels_getChannelFilter",
      timeout: this.getTimeout(),
      success: e,
      error: i || function(t, e) {
        "timeout" == e && $.log(LogPrefix() + "AudioAddict.API.Channels.getChannelFilter(): Timed out!", t, e)
      }
    })
  }
}, NS("AudioAddict.API.Channels").getChannelById = function(t) {
  return this._channels = this._channels || _.pluck(AudioAddict.API.Config.channels, "channel"), this._keysById = this._keysById || {}, this._keysById[t] = this._keysById[t] || _.findWhere(this._channels, {
    id: t
  }), this._keysById[t]
}, NS("AudioAddict.API.Channels").getChannelByKey = function(t) {
  return this._channels = this._channels || _.pluck(AudioAddict.API.Config.channels, "channel"), this._idsByKey = this._idsByKey || {}, this._idsByKey[t] = this._idsByKey[t] || _.findWhere(this._channels, {
    key: t
  }), this._idsByKey[t]
}, NS("AudioAddict.API").Playlists = function(t, e) {
  if (!(this instanceof arguments.callee)) return $.log(LogPrefix() + "AudioAddict.API.Playlists: Forcing instantiation"), new AudioAddict.API.Playlists(t, e);
  $.log(LogPrefix() + "AudioAddict.API.Playlists: Instantiating", arguments);
  var i, n = NS("AudioAddict.API"),
      r = t,
      s = n.Config.listenKey,
      o = e || {};
  o.streamset || (o.streamset = "webplayer"), o.ext || (o.ext = "jsonp"), this.getTimeout = function() {
    return "undefined" == typeof i && (i = o.timeout >= 100 ? i = 1e3 * i : n.Default.timeout), i
  }, this.appendListenKey = function(t) {
    return null !== s ? t + "?listen_key=" + s : t
  }, this.allUrl = function() {
    var t = r + "/" + o.streamset + "." + o.ext;
    return this.appendListenKey(t)
  }, this.channelUrl = function(t) {
    var e = r + "/" + o.streamset + "/" + t + "." + o.ext;
    return this.appendListenKey(e)
  }, this.getAll = function(t, e) {
    $.log(LogPrefix() + "AudioAddict.API.Playlists.getAll(): Fetching playlists for all channels\u2026"), $.ajax({
      url: this.allUrl(),
      dataType: "jsonp",
      jsonpCallback: "_API_Playlists_getAll",
      timeout: this.getTimeout(),
      success: t,
      error: e || function(t, e) {
        "timeout" == e && $.log(LogPrefix() + "AudioAddict.API.Playlists.getAll(): Timed out!", t, e)
      }
    })
  }, this.getChannel = function(t, e, i) {
    $.log(LogPrefix() + "AudioAddict.API.Playlists.getChannel(): Fetching playlists for channel {" + t + "}\u2026"), $.ajax({
      url: this.channelUrl(t),
      dataType: "jsonp",
      cache: !0,
      jsonpCallback: "_API_Playlists_getChannel",
      timeout: this.getTimeout(),
      success: e,
      error: i || function(t, e) {
        "timeout" == e && $.log(LogPrefix() + "AudioAddict.API.Playlists.getChannel(): Timed out!", t, e)
      }
    })
  }
}, NS("AudioAddict.API.Default").player = "webplayer", NS("AudioAddict.API.Default").wpType = "embedded", NS("AudioAddict.API.Default").speed = "aac_high", NS("AudioAddict.API").Streamsets = {
  premium: {
    webplayer: {
      aac_high: {
        visible: !0,
        key: "premium",
        format: "aac",
        ext: "flv",
        bitrate: 128,
        format_label: "AAC",
        label: "Excellent"
      },
      mp3_high: {
        visible: !0,
        key: "premium_high",
        format: "mp3",
        ext: "pls",
        bitrate: 256,
        format_label: "MP3",
        label: "Excellent"
      },
      low: {
        visible: !0,
        key: "premium_low",
        format: "aac",
        ext: "pls",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      },
      medium: {
        visible: !0,
        key: "premium_medium",
        format: "aac",
        ext: "pls",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      }
    },
    aac: {
      high: {
        visible: !0,
        key: "premium",
        format: "aac",
        ext: "pls",
        bitrate: 128,
        format_label: "AAC",
        label: "Excellent"
      },
      mp3_high: {
        visible: !0,
        key: "premium_high",
        format: "mp3",
        ext: "pls",
        bitrate: 256,
        format_label: "MP3",
        label: "Excellent"
      },
      low: {
        visible: !0,
        key: "premium_low",
        format: "aac",
        ext: "pls",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      },
      medium: {
        visible: !0,
        key: "premium_medium",
        format: "aac",
        ext: "pls",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      }
    },
    external: {
      aac_high: {
        visible: !0,
        key: "premium",
        format: "aac",
        ext: "pls",
        bitrate: 128,
        format_label: "AAC",
        label: "Excellent"
      },
      mp3_high: {
        visible: !0,
        key: "premium_high",
        format: "mp3",
        ext: "pls",
        bitrate: 256,
        format_label: "MP3",
        label: "Excellent"
      },
      aac_low: {
        visible: !0,
        key: "premium_low",
        format: "aac",
        ext: "pls",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      },
      aac_medium: {
        visible: !0,
        key: "premium_medium",
        format: "aac",
        ext: "pls",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      }
    },
    mp3: {
      high: {
        visible: !0,
        key: "premium_high",
        format: "mp3",
        ext: "pls",
        bitrate: 256,
        format_label: "MP3",
        label: "Excellent"
      }
    },
    wma: {
      high: {
        visible: !1,
        key: "premium_wma",
        format: "asx",
        ext: "asx",
        bitrate: 128,
        format_label: "WMA",
        label: "Excellent"
      },
      medium: {
        visible: !1,
        key: "premium_wma_low",
        format: "asx",
        ext: "asx",
        bitrate: 64,
        format_label: "WMA",
        label: "Good"
      }
    }
  },
  "public": {
    aac: {
      medium: {
        visible: !0,
        key: "public1",
        format: "aac",
        ext: "pls",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      },
      low: {
        visible: !0,
        key: "public2",
        format: "aac",
        ext: "pls",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      },
      mp3_medium: {
        visible: !0,
        key: "public3",
        format: "mp3",
        ext: "pls",
        bitrate: 96,
        format_label: "MP3",
        label: "Good"
      }
    },
    external: {
      aac_medium_plus: {
        visible: !0,
        key: "public1",
        format: "aac",
        ext: "pls",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      },
      aac_medium: {
        visible: !0,
        key: "public2",
        format: "aac",
        ext: "pls",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      },
      mp3_medium: {
        visible: !0,
        key: "public3",
        format: "mp3",
        ext: "pls",
        bitrate: 96,
        format_label: "MP3",
        label: "Good"
      }
    },
    mp3: {
      medium: {
        visible: !0,
        key: "public3",
        format: "mp3",
        ext: "pls",
        bitrate: 96,
        format_label: "MP3",
        label: "Good"
      }
    },
    wma: {
      medium: {
        visible: !1,
        key: "public5",
        format: "asx",
        ext: "asx",
        bitrate: 40,
        format_label: "WMA",
        label: "Good"
      }
    },
    webplayer: {
      medium_plus: {
        visible: !0,
        key: "webplayer1",
        format: "aac",
        ext: "flv",
        bitrate: 64,
        format_label: "AAC-HE",
        label: "Good"
      },
      medium: {
        visible: !0,
        key: "webplayer2",
        format: "aac",
        ext: "flv",
        bitrate: 40,
        format_label: "AAC-HE",
        label: "Low"
      }
    }
  }
},
  function(t, e, i) {
    function n(e, n) {
      var r, s;
      t.ajax({
        url: [i.API.Config.url, i.API.Config.network, "tracks", e].join("/") + ".jsonp",
        dataType: "jsonp",
        data: {
          api_key: i.API.Config.member.api_key
        },
        success: function(t) {
          s = t
        },
        error: function(e, i, n) {
          t.log(LogPrefix() + u, i, n), r = i
        },
        complete: function() {
          n(r, s)
        }
      })
    }

    function r(e) {
      this.$btn = t(e), this.$el = this.$btn.closest(".ui-voting"), this.trackId = this.$btn.data("track-id"), this.channelId = this.$btn.data("channel-id"), this.upOrDown = this.$btn.is(".up") ? "up" : "down", this.voted = c[this.trackId] === this.upOrDown, this.voting = !1, this.action = this.voted ? null : this.upOrDown, this.method = this.voted ? "DELETE" : "POST", this.format = "jsonp"
    }

    function s(i, n) {
      t(n || e.body).find(".vote-btn").each(function() {
        var e = c[t(this).data("track-id")];
        e && t(this).is("." + e) && t(this).addClass("voted")
      }), t(n).find(".popdown").popdown()
    }

    function o(t) {
      a && a.voting || (a = new i.API.TrackVote.Voter(t.target), a.vote())
    }
    var a, l = t(e),
        u = "AudioAddict.API.TrackVote",
        c = {};
    t.duped(u) || (r.prototype = {
      vote: function() {
        var e, n;
        t.ajax({
          context: this,
          url: this._getVoteUrl(),
          dataType: this.format,
          data: {
            api_key: i.API.Config.member.api_key,
            _method: this.method
          },
          beforeSend: function() {
            return this.voting ? (t.log(LogPrefix() + u + "Already voting, aborting request"), !1) : void(this.voting = !0)
          },
          success: function(e) {
            n = e, t(this).trigger("Success.TrackVote", [e])
          },
          error: function(i, n, r) {
            t.log(LogPrefix() + u, n, r), e = n, t(this).trigger("Error.TrackVote", [i, n, r])
          },
          complete: function() {
            this.voting = !1, this._afterVote(e, n)
          }
        })
      },
      _afterVote: function(e) {
        return e ? (t.log(LogPrefix() + u + ": ERROR %s vote for track_id: {%s}. Reason: {%s}", this.voted ? "retracting " : "casting", this.trackId, e), void t.growlUI("", "Error: Unable to save vote.")) : void n(this.trackId, t.proxy(function(e, n) {
          if (n.track_id = n.id, e) return t.log(LogPrefix() + u + ": ERROR %s vote for track_id: {%s}. Reason: {%s}", this.voted ? "retracting " : "casting", this.trackId, e), void t.growlUI("", "Error: Unable to save vote.");
          t.log(LogPrefix() + u + ": successfully %s vote {%s} for track_id: {%s}", this.voted ? "retracted " : "cast", this.upOrDown, this.trackId), c[this.trackId] = this.voted ? null : this.upOrDown;
          var r = t(i.UI.Templates.render("shared/track_vote_buttons", {
            track: n
          }));
          this.$el.replaceWith(r), this.$el = r, this.$el.popdown(), this.$el.find(".popdown-reveal").attr("data-vote-direction", this.upOrDown).show(), this.$btn = this.$el.find(".vote-btn").filter("." + this.upOrDown).toggleClass("voted", c[this.trackId] ? !0 : !1)
        }, this))
      },
      _getVoteUrl: function() {
        var e, n = [i.API.Config.url, i.API.Config.network, "tracks", this.trackId, "vote", this.channelId];
        return this.action && n.push(this.action), e = n.join("/") + "." + this.format, t.log(LogPrefix() + u + ": Vote URL: " + e), e
      }
    }, NS("AudioAddict.API.TrackVote").toPercent = function(t, e) {
      e.votes = e.votes || {
        up: 0,
        down: 0
      };
      var i = e.votes.up + e.votes.down,
          n = Math.floor("up" === t ? e.votes.up / i * 100 : e.votes.down / i * 100) || 0;
      return n
    }, NS("AudioAddict.API.TrackVote").Voter = r, l.on("TrackVote.Up TrackVote.Down", o).on("WP.HistoryUpdated", s).on("mouseleave", ".track", function() {
      t(this).find(".popdown-reveal").hide()
    }).on("mouseenter", ".vote-btn", function() {
      var e = t(this),
          i = e.closest(".popdown").find(".popdown-reveal"),
          n = e.hasClass("up") ? "up" : "down";
      i.attr("data-vote-direction", n)
    }))
  }(jQuery, document, AudioAddict),
  function() {
    var t = !1,
        e = /xyz/.test(function() {}) ? /\b_super\b/ : /.*/;
    this.Class = function() {}, Class.extend = function(i) {
      function n() {
        !t && this.init && this.init.apply(this, arguments)
      }
      var r = this.prototype;
      t = !0;
      var s = new this;
      t = !1;
      for (var o in i) s[o] = "function" == typeof i[o] && "function" == typeof r[o] && e.test(i[o]) ? function(t, e) {
        return function() {
          var i = this._super;
          this._super = r[t];
          var n = e.apply(this, arguments);
          return this._super = i, n
        }
      }(o, i[o]) : i[o];
      return n.prototype = s, n.prototype.constructor = n, n.extend = arguments.callee, n
    }
  }(),
  function(t, e) {
    NS(t).Base = e.extend({
      NS: t + ".Base",
      checkParams: function() {
        var t = this;
        return this._required.map(function(e) {
          "undefined" == typeof t.params[e] && t.fatal("Missing required parameter: " + e)
        }), this
      },
      fatal: function(t) {
        throw LogPrefix(this) + t + " (FATAL)"
      },
      log: function() {
        var t = arguments;
        return "string" == typeof t[0] && (t[0] = LogPrefix(this) + t[0]), $.log.apply($, t), this
      },
      init: function(t) {
        return this.params = t || {}, this._required instanceof Object && this.checkParams(), this
      }
    })
  }("AudioAddict.Modules", Class),
/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
  jQuery.cookie = function(t, e, i) {
    if (arguments.length > 1 && "[object Object]" !== String(e)) {
      if (i = jQuery.extend({}, i), (null === e || void 0 === e) && (i.expires = -1), "number" == typeof i.expires) {
        var n = i.expires,
            r = i.expires = new Date;
        r.setDate(r.getDate() + n)
      }
      return e = String(e), document.cookie = [encodeURIComponent(t), "=", i.raw ? e : encodeURIComponent(e), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
    }
    i = e || {};
    var s, o = i.raw ? function(t) {
      return t
    } : decodeURIComponent;
    return (s = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? o(s[1]) : null
  },
  function(t, e, i, n) {
    var r = i.API.Default.player,
        s = i.API.Default.wpType,
        o = i.API.Default.speed;
    NS(t).PlayerSettings = e.extend({
      NS: t + ".PlayerSettings",
      _required: ["authenticated", "access", "listenKey", "listenUrl", "streams"],
      init: function(t) {
        this._super(t);
        var e = this.player = n.cookie("player"),
            i = this.wpType = n.cookie("wptype"),
            s = this.speed = n.cookie("speed");
        e && "0" === e ? (n.cookie("player", null), n.cookie("speed", null), this.log("Legacy player settings detected:", e, s), this.log("Updating player settings with default"), this.save(r, o)) : (this.log("Current stored settings:", e, s, i), this.setPlayer(e).setSpeed(s))
      },
      setPlayer: function(t) {
        return this.player = t && this.params.authenticated && "object" == typeof this.params.streams[this.params.access][t] ? t : r, this.log("Player is now:", this.player)
      },
      setWpType: function(t) {
        return this.wpType = "webplayer" === this.player && t ? t : s, this.log("WP Type is now:", this.wpType)
      },
      setSpeed: function(t) {
        var e = Object.keys(this.params.streams[this.params.access][this.player])[0];
        return this.speed = t && this.params.authenticated && "object" == typeof this.params.streams[this.params.access][this.player][t] ? t : e, this.log("Speed is now:", this.speed)
      },
      save: function(t, e, i) {
        return this.log("Saving:", t, e, i), this.setPlayer(t).setWpType(i).setSpeed(e), n.cookie("player", this.player, {
          expires: 3650,
          path: "/"
        }), n.cookie("wptype", this.wpType, {
          expires: 3650,
          path: "/"
        }), n.cookie("speed", this.speed, {
          expires: 3650,
          path: "/"
        }), n.cookie("wp-settings-updated", !0), this
      },
      getPlayer: function() {
        return this.player
      },
      getWpType: function() {
        return this.wpType
      },
      getBitrate: function() {
        return this.speed
      },
      getAccess: function() {
        return this.params.access
      },
      getAuthenticated: function() {
        return this.params.authenticated
      },
      getBitrates: function(t, e) {
        return t = t || this.params.access, e = e || this.player, this.params.streams[t][e]
      },
      getBitrateDetails: function(t, e, i) {
        return t = t || this.params.access, e = e || this.player, this.params.streams[t][e][i]
      },
      getStreamUrl: function(t) {
        var e = this.params.streams[this.params.access][this.player][this.speed];
        return i.API.Playlists(this.params.listenUrl, {
          streamset: e.key,
          ext: e.ext ? e.ext : null
        }).channelUrl(t)
      }
    })
  }("AudioAddict.Modules", AudioAddict.Modules.Base, AudioAddict, jQuery), NS("AudioAddict.API").Favorites = function(t, e, i) {
  function n(t, e, i, n) {
    $.ajax({
      url: a + "members/" + s.Config.member.id + "/favorites/channel/" + e + ".jsonp",
      type: t,
      data: {
        api_key: s.Config.member.api_key,
        _method: t
      },
      dataType: "jsonp",
      success: i || $.noop,
      error: n || $.noop
    })
  }
  if (!(this instanceof arguments.callee)) return $.log(LogPrefix() + "AudioAddict.API.Favorites: Forcing instantiation"), new AudioAddict.API.Favorites(t, e, i);
  $.log(LogPrefix() + "AudioAddict.API.Favorites: Instantiating", arguments);
  var r, s = NS("AudioAddict.API"),
      o = NS("AudioAddict.Util"),
      a = t + "/" + e + "/",
      l = "jsonp",
      u = i || {};
  return s.Config.member ? (this.getTimeout = function() {
    return "undefined" == typeof r && (r = u.timeout >= 100 ? r = 1e3 * r : s.Default.timeout), r
  }, this.save = function(t, e, i) {
    $.log(LogPrefix() + "AudioAddict.API.Favorites.save(): Saving all favorites\u2026"), $.ajax({
      url: a + "members/" + s.Config.member.id + "/favorites/channels." + l,
      data: {
        _method: "POST",
        api_key: s.Config.member.api_key,
        favorites: o.JSON.stringify(t)
      },
      dataType: "jsonp",
      jsonpCallback: "_API_Favorites_save",
      timeout: this.getTimeout(),
      success: e,
      error: i || function(t, e) {
        "timeout" == e && $.log(LogPrefix() + "AudioAddict.API.Favorites.save(): Timed out!", t, e)
      }
    })
  }, this.add = function(t, e, i) {
    n("POST", t, e, i)
  }, void(this.remove = function(t, e, i) {
    n("DELETE", t, e, i)
  })) : ($.log(LogPrefix() + "AudioAddict.API.Favorites.saveUrl(): FATAL: User is not signed in, or current_user is undefined"), !1)
},
  function(t, e, i) {
    var n = '[data-event="Channel.Favorite.Toggle"]',
        r = {
          authService: null,
          api_favorites: null,
          channels: null,
          favorites: null,
          onChannelChange: function(e, i) {
            var s = t(n);
            s.each(function() {
              t(this).data({
                channelId: i.id,
                channelName: i.name
              })
            }), r.updateButtonState(i)
          },
          onFavoriteClick: function(e, s) {
            if (!AudioAddict.API.Config.member) {
              var o = "You must be logged in to add the " + t(s).data("channel-name") + " channel to your favorites";
              return void r.authService.showLoginDialog(o)
            }
            var a = t(s),
                l = a.hasClass("favorite"),
                u = a.data("channel-id"),
                c = _.where(r.channels, {
                  id: u
                })[0],
                h = t(n);
            h.filter(function() {
              return t(this).data("channel-id") === c.id
            }).addClass("processing"), t(i).trigger("Channel.Favorite.Processing", [c]), l ? r.removeFavorite(u) : r.addFavorite(u)
          },
          addFavorite: function(e) {
            var n = _.where(r.channels, {
              id: e
            })[0];
            r.api_favorites.add(e, function() {
              r.favorites.push(e), n.favorite = !0, r.updateButtonState(n), r.updateChannelNav(n), t.growlUI("", n.name + " added to favorites."), t(i).trigger("Channel.Favorite.Added", [n])
            }, function() {
              r.updateButtonState(n), t(i).trigger("Channel.Favorite.Failed", [n])
            })
          },
          removeFavorite: function(e) {
            var n = _.where(r.channels, {
              id: e
            })[0];
            r.api_favorites.remove(e, function() {
              delete r.favorites[r.favorites.indexOf(e)], n.favorite = !1, r.updateButtonState(n), r.updateChannelNav(n), t.growlUI("", n.name + " removed from favorites."), t(i).trigger("Channel.Favorite.Removed", [n])
            }, function() {
              r.updateButtonState(n), t(i).trigger("Channel.Favorite.Failed", [n])
            })
          },
          updateButtonState: function(e) {
            function i(e, i) {
              e.attr("title", i), e.filter(function() {
                return 0 === t(this).find("i").length
              }).text(i)
            }

            function s(e, i, n) {
              e.each(function(e, r) {
                var s, o = t(r);
                /icon-star/.test(o.attr("class")) ? s = o : (s = o.find(".icon-star, .icon-star-empty"), s.length || (s = o.prev(".icon-star, .icon-star-empty"))), s.swapClass(i, n)
              })
            }
            var o, a = t(n);
            o = a.filter(function() {
              return t(this).data("channel-id") === e.id
            }), _.contains(r.favorites, e.id) ? (o.swapClass("processing", "favorite"), s(o, "icon-star-empty", "icon-star"), i(o, "Remove from favorites")) : (o.removeClass("processing favorite"), s(o, "icon-star", "icon-star-empty"), i(o, "Favorite this channel"))
          },
          updateChannelNav: function(e) {
            var i = t('[data-channel-id="' + e.id + '"]');
            i.toggleClass("favorite", _.contains(r.favorites, e.id))
          },
          init: function() {
            r.api_favorites = new AudioAddict.API.Favorites(AudioAddict.API.Config.url, AudioAddict.API.Config.network), r.authService = new AudioAddict.Modules.Auth({
              urlLogin: AudioAddict.API.Config.urlLogin,
              urlLogout: AudioAddict.API.Config.urlLogout,
              afterLogin: t.noop,
              afterLogout: t.noop
            }), r.channels = "object" == typeof AudioAddict.API.Config.channels[0].channel ? _.pluck(AudioAddict.API.Config.channels, "channel") : AudioAddict.API.Config.channels, r.favorites = _.pluck(_.where(r.channels, {
              favorite: !0
            }), "id")
          }
        };
    t(i).on({
      "Channel.Changed": r.onChannelChange,
      "Channel.Favorite.Toggle": r.onFavoriteClick,
      ready: r.init
    })
  }(jQuery, window, document),
  function() {
    var t = this,
        e = t._,
        i = {},
        n = Array.prototype,
        r = Object.prototype,
        s = Function.prototype,
        o = n.push,
        a = n.slice,
        l = n.concat,
        u = r.toString,
        c = r.hasOwnProperty,
        h = n.forEach,
        d = n.map,
        f = n.reduce,
        p = n.reduceRight,
        g = n.filter,
        m = n.every,
        v = n.some,
        y = n.indexOf,
        _ = n.lastIndexOf,
        b = Array.isArray,
        w = Object.keys,
        x = s.bind,
        k = function(t) {
          return t instanceof k ? t : this instanceof k ? void(this._wrapped = t) : new k(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : t._ = k, k.VERSION = "1.6.0";
    var P = k.each = k.forEach = function(t, e, n) {
      if (null == t) return t;
      if (h && t.forEach === h) t.forEach(e, n);
      else if (t.length === +t.length) {
        for (var r = 0, s = t.length; s > r; r++)
          if (e.call(n, t[r], r, t) === i) return
      } else
        for (var o = k.keys(t), r = 0, s = o.length; s > r; r++)
          if (e.call(n, t[o[r]], o[r], t) === i) return; return t
    };
    k.map = k.collect = function(t, e, i) {
      var n = [];
      return null == t ? n : d && t.map === d ? t.map(e, i) : (P(t, function(t, r, s) {
        n.push(e.call(i, t, r, s))
      }), n)
    };
    var A = "Reduce of empty array with no initial value";
    k.reduce = k.foldl = k.inject = function(t, e, i, n) {
      var r = arguments.length > 2;
      if (null == t && (t = []), f && t.reduce === f) return n && (e = k.bind(e, n)), r ? t.reduce(e, i) : t.reduce(e);
      if (P(t, function(t, s, o) {
        r ? i = e.call(n, i, t, s, o) : (i = t, r = !0)
      }), !r) throw new TypeError(A);
      return i
    }, k.reduceRight = k.foldr = function(t, e, i, n) {
      var r = arguments.length > 2;
      if (null == t && (t = []), p && t.reduceRight === p) return n && (e = k.bind(e, n)), r ? t.reduceRight(e, i) : t.reduceRight(e);
      var s = t.length;
      if (s !== +s) {
        var o = k.keys(t);
        s = o.length
      }
      if (P(t, function(a, l, u) {
        l = o ? o[--s] : --s, r ? i = e.call(n, i, t[l], l, u) : (i = t[l], r = !0)
      }), !r) throw new TypeError(A);
      return i
    }, k.find = k.detect = function(t, e, i) {
      var n;
      return C(t, function(t, r, s) {
        return e.call(i, t, r, s) ? (n = t, !0) : void 0
      }), n
    }, k.filter = k.select = function(t, e, i) {
      var n = [];
      return null == t ? n : g && t.filter === g ? t.filter(e, i) : (P(t, function(t, r, s) {
        e.call(i, t, r, s) && n.push(t)
      }), n)
    }, k.reject = function(t, e, i) {
      return k.filter(t, function(t, n, r) {
        return !e.call(i, t, n, r)
      }, i)
    }, k.every = k.all = function(t, e, n) {
      e || (e = k.identity);
      var r = !0;
      return null == t ? r : m && t.every === m ? t.every(e, n) : (P(t, function(t, s, o) {
        return (r = r && e.call(n, t, s, o)) ? void 0 : i
      }), !!r)
    };
    var C = k.some = k.any = function(t, e, n) {
      e || (e = k.identity);
      var r = !1;
      return null == t ? r : v && t.some === v ? t.some(e, n) : (P(t, function(t, s, o) {
        return r || (r = e.call(n, t, s, o)) ? i : void 0
      }), !!r)
    };
    k.contains = k.include = function(t, e) {
      return null == t ? !1 : y && t.indexOf === y ? -1 != t.indexOf(e) : C(t, function(t) {
        return t === e
      })
    }, k.invoke = function(t, e) {
      var i = a.call(arguments, 2),
          n = k.isFunction(e);
      return k.map(t, function(t) {
        return (n ? e : t[e]).apply(t, i)
      })
    }, k.pluck = function(t, e) {
      return k.map(t, k.property(e))
    }, k.where = function(t, e) {
      return k.filter(t, k.matches(e))
    }, k.findWhere = function(t, e) {
      return k.find(t, k.matches(e))
    }, k.max = function(t, e, i) {
      if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
      var n = -1 / 0,
          r = -1 / 0;
      return P(t, function(t, s, o) {
        var a = e ? e.call(i, t, s, o) : t;
        a > r && (n = t, r = a)
      }), n
    }, k.min = function(t, e, i) {
      if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
      var n = 1 / 0,
          r = 1 / 0;
      return P(t, function(t, s, o) {
        var a = e ? e.call(i, t, s, o) : t;
        r > a && (n = t, r = a)
      }), n
    }, k.shuffle = function(t) {
      var e, i = 0,
          n = [];
      return P(t, function(t) {
        e = k.random(i++), n[i - 1] = n[e], n[e] = t
      }), n
    }, k.sample = function(t, e, i) {
      return null == e || i ? (t.length !== +t.length && (t = k.values(t)), t[k.random(t.length - 1)]) : k.shuffle(t).slice(0, Math.max(0, e))
    };
    var S = function(t) {
      return null == t ? k.identity : k.isFunction(t) ? t : k.property(t)
    };
    k.sortBy = function(t, e, i) {
      return e = S(e), k.pluck(k.map(t, function(t, n, r) {
        return {
          value: t,
          index: n,
          criteria: e.call(i, t, n, r)
        }
      }).sort(function(t, e) {
        var i = t.criteria,
            n = e.criteria;
        if (i !== n) {
          if (i > n || void 0 === i) return 1;
          if (n > i || void 0 === n) return -1
        }
        return t.index - e.index
      }), "value")
    };
    var I = function(t) {
      return function(e, i, n) {
        var r = {};
        return i = S(i), P(e, function(s, o) {
          var a = i.call(n, s, o, e);
          t(r, a, s)
        }), r
      }
    };
    k.groupBy = I(function(t, e, i) {
      k.has(t, e) ? t[e].push(i) : t[e] = [i]
    }), k.indexBy = I(function(t, e, i) {
      t[e] = i
    }), k.countBy = I(function(t, e) {
      k.has(t, e) ? t[e] ++ : t[e] = 1
    }), k.sortedIndex = function(t, e, i, n) {
      i = S(i);
      for (var r = i.call(n, e), s = 0, o = t.length; o > s;) {
        var a = s + o >>> 1;
        i.call(n, t[a]) < r ? s = a + 1 : o = a
      }
      return s
    }, k.toArray = function(t) {
      return t ? k.isArray(t) ? a.call(t) : t.length === +t.length ? k.map(t, k.identity) : k.values(t) : []
    }, k.size = function(t) {
      return null == t ? 0 : t.length === +t.length ? t.length : k.keys(t).length
    }, k.first = k.head = k.take = function(t, e, i) {
      return null == t ? void 0 : null == e || i ? t[0] : 0 > e ? [] : a.call(t, 0, e)
    }, k.initial = function(t, e, i) {
      return a.call(t, 0, t.length - (null == e || i ? 1 : e))
    }, k.last = function(t, e, i) {
      return null == t ? void 0 : null == e || i ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
    }, k.rest = k.tail = k.drop = function(t, e, i) {
      return a.call(t, null == e || i ? 1 : e)
    }, k.compact = function(t) {
      return k.filter(t, k.identity)
    };
    var T = function(t, e, i) {
      return e && k.every(t, k.isArray) ? l.apply(i, t) : (P(t, function(t) {
        k.isArray(t) || k.isArguments(t) ? e ? o.apply(i, t) : T(t, e, i) : i.push(t)
      }), i)
    };
    k.flatten = function(t, e) {
      return T(t, e, [])
    }, k.without = function(t) {
      return k.difference(t, a.call(arguments, 1))
    }, k.partition = function(t, e, i) {
      e = S(e);
      var n = [],
          r = [];
      return P(t, function(t) {
        (e.call(i, t) ? n : r).push(t)
      }), [n, r]
    }, k.uniq = k.unique = function(t, e, i, n) {
      k.isFunction(e) && (n = i, i = e, e = !1);
      var r = i ? k.map(t, i, n) : t,
          s = [],
          o = [];
      return P(r, function(i, n) {
        (e ? n && o[o.length - 1] === i : k.contains(o, i)) || (o.push(i), s.push(t[n]))
      }), s
    }, k.union = function() {
      return k.uniq(k.flatten(arguments, !0))
    }, k.intersection = function(t) {
      var e = a.call(arguments, 1);
      return k.filter(k.uniq(t), function(t) {
        return k.every(e, function(e) {
          return k.contains(e, t)
        })
      })
    }, k.difference = function(t) {
      var e = l.apply(n, a.call(arguments, 1));
      return k.filter(t, function(t) {
        return !k.contains(e, t)
      })
    }, k.zip = function() {
      for (var t = k.max(k.pluck(arguments, "length").concat(0)), e = new Array(t), i = 0; t > i; i++) e[i] = k.pluck(arguments, "" + i);
      return e
    }, k.object = function(t, e) {
      if (null == t) return {};
      for (var i = {}, n = 0, r = t.length; r > n; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
      return i
    }, k.indexOf = function(t, e, i) {
      if (null == t) return -1;
      var n = 0,
          r = t.length;
      if (i) {
        if ("number" != typeof i) return n = k.sortedIndex(t, e), t[n] === e ? n : -1;
        n = 0 > i ? Math.max(0, r + i) : i
      }
      if (y && t.indexOf === y) return t.indexOf(e, i);
      for (; r > n; n++)
        if (t[n] === e) return n;
      return -1
    }, k.lastIndexOf = function(t, e, i) {
      if (null == t) return -1;
      var n = null != i;
      if (_ && t.lastIndexOf === _) return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
      for (var r = n ? i : t.length; r--;)
        if (t[r] === e) return r;
      return -1
    }, k.range = function(t, e, i) {
      arguments.length <= 1 && (e = t || 0, t = 0), i = arguments[2] || 1;
      for (var n = Math.max(Math.ceil((e - t) / i), 0), r = 0, s = new Array(n); n > r;) s[r++] = t, t += i;
      return s
    };
    var E = function() {};
    k.bind = function(t, e) {
      var i, n;
      if (x && t.bind === x) return x.apply(t, a.call(arguments, 1));
      if (!k.isFunction(t)) throw new TypeError;
      return i = a.call(arguments, 2), n = function() {
        if (!(this instanceof n)) return t.apply(e, i.concat(a.call(arguments)));
        E.prototype = t.prototype;
        var r = new E;
        E.prototype = null;
        var s = t.apply(r, i.concat(a.call(arguments)));
        return Object(s) === s ? s : r
      }
    }, k.partial = function(t) {
      var e = a.call(arguments, 1);
      return function() {
        for (var i = 0, n = e.slice(), r = 0, s = n.length; s > r; r++) n[r] === k && (n[r] = arguments[i++]);
        for (; i < arguments.length;) n.push(arguments[i++]);
        return t.apply(this, n)
      }
    }, k.bindAll = function(t) {
      var e = a.call(arguments, 1);
      if (0 === e.length) throw new Error("bindAll must be passed function names");
      return P(e, function(e) {
        t[e] = k.bind(t[e], t)
      }), t
    }, k.memoize = function(t, e) {
      var i = {};
      return e || (e = k.identity),
        function() {
          var n = e.apply(this, arguments);
          return k.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
        }
    }, k.delay = function(t, e) {
      var i = a.call(arguments, 2);
      return setTimeout(function() {
        return t.apply(null, i)
      }, e)
    }, k.defer = function(t) {
      return k.delay.apply(k, [t, 1].concat(a.call(arguments, 1)))
    }, k.throttle = function(t, e, i) {
      var n, r, s, o = null,
          a = 0;
      i || (i = {});
      var l = function() {
        a = i.leading === !1 ? 0 : k.now(), o = null, s = t.apply(n, r), n = r = null
      };
      return function() {
        var u = k.now();
        a || i.leading !== !1 || (a = u);
        var c = e - (u - a);
        return n = this, r = arguments, 0 >= c ? (clearTimeout(o), o = null, a = u, s = t.apply(n, r), n = r = null) : o || i.trailing === !1 || (o = setTimeout(l, c)), s
      }
    }, k.debounce = function(t, e, i) {
      var n, r, s, o, a, l = function() {
        var u = k.now() - o;
        e > u ? n = setTimeout(l, e - u) : (n = null, i || (a = t.apply(s, r), s = r = null))
      };
      return function() {
        s = this, r = arguments, o = k.now();
        var u = i && !n;
        return n || (n = setTimeout(l, e)), u && (a = t.apply(s, r), s = r = null), a
      }
    }, k.once = function(t) {
      var e, i = !1;
      return function() {
        return i ? e : (i = !0, e = t.apply(this, arguments), t = null, e)
      }
    }, k.wrap = function(t, e) {
      return k.partial(e, t)
    }, k.compose = function() {
      var t = arguments;
      return function() {
        for (var e = arguments, i = t.length - 1; i >= 0; i--) e = [t[i].apply(this, e)];
        return e[0]
      }
    }, k.after = function(t, e) {
      return function() {
        return --t < 1 ? e.apply(this, arguments) : void 0
      }
    }, k.keys = function(t) {
      if (!k.isObject(t)) return [];
      if (w) return w(t);
      var e = [];
      for (var i in t) k.has(t, i) && e.push(i);
      return e
    }, k.values = function(t) {
      for (var e = k.keys(t), i = e.length, n = new Array(i), r = 0; i > r; r++) n[r] = t[e[r]];
      return n
    }, k.pairs = function(t) {
      for (var e = k.keys(t), i = e.length, n = new Array(i), r = 0; i > r; r++) n[r] = [e[r], t[e[r]]];
      return n
    }, k.invert = function(t) {
      for (var e = {}, i = k.keys(t), n = 0, r = i.length; r > n; n++) e[t[i[n]]] = i[n];
      return e
    }, k.functions = k.methods = function(t) {
      var e = [];
      for (var i in t) k.isFunction(t[i]) && e.push(i);
      return e.sort()
    }, k.extend = function(t) {
      return P(a.call(arguments, 1), function(e) {
        if (e)
          for (var i in e) t[i] = e[i]
      }), t
    }, k.pick = function(t) {
      var e = {},
          i = l.apply(n, a.call(arguments, 1));
      return P(i, function(i) {
        i in t && (e[i] = t[i])
      }), e
    }, k.omit = function(t) {
      var e = {},
          i = l.apply(n, a.call(arguments, 1));
      for (var r in t) k.contains(i, r) || (e[r] = t[r]);
      return e
    }, k.defaults = function(t) {
      return P(a.call(arguments, 1), function(e) {
        if (e)
          for (var i in e) void 0 === t[i] && (t[i] = e[i])
      }), t
    }, k.clone = function(t) {
      return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
    }, k.tap = function(t, e) {
      return e(t), t
    };
    var M = function(t, e, i, n) {
      if (t === e) return 0 !== t || 1 / t == 1 / e;
      if (null == t || null == e) return t === e;
      t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
      var r = u.call(t);
      if (r != u.call(e)) return !1;
      switch (r) {
        case "[object String]":
          return t == String(e);
        case "[object Number]":
          return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
        case "[object Date]":
        case "[object Boolean]":
          return +t == +e;
        case "[object RegExp]":
          return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
      }
      if ("object" != typeof t || "object" != typeof e) return !1;
      for (var s = i.length; s--;)
        if (i[s] == t) return n[s] == e;
      var o = t.constructor,
          a = e.constructor;
      if (o !== a && !(k.isFunction(o) && o instanceof o && k.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
      i.push(t), n.push(e);
      var l = 0,
          c = !0;
      if ("[object Array]" == r) {
        if (l = t.length, c = l == e.length)
          for (; l-- && (c = M(t[l], e[l], i, n)););
      } else {
        for (var h in t)
          if (k.has(t, h) && (l++, !(c = k.has(e, h) && M(t[h], e[h], i, n)))) break;
        if (c) {
          for (h in e)
            if (k.has(e, h) && !l--) break;
          c = !l
        }
      }
      return i.pop(), n.pop(), c
    };
    k.isEqual = function(t, e) {
      return M(t, e, [], [])
    }, k.isEmpty = function(t) {
      if (null == t) return !0;
      if (k.isArray(t) || k.isString(t)) return 0 === t.length;
      for (var e in t)
        if (k.has(t, e)) return !1;
      return !0
    }, k.isElement = function(t) {
      return !(!t || 1 !== t.nodeType)
    }, k.isArray = b || function(t) {
      return "[object Array]" == u.call(t)
    }, k.isObject = function(t) {
      return t === Object(t)
    }, P(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
      k["is" + t] = function(e) {
        return u.call(e) == "[object " + t + "]"
      }
    }), k.isArguments(arguments) || (k.isArguments = function(t) {
      return !(!t || !k.has(t, "callee"))
    }), "function" != typeof /./ && (k.isFunction = function(t) {
      return "function" == typeof t
    }), k.isFinite = function(t) {
      return isFinite(t) && !isNaN(parseFloat(t))
    }, k.isNaN = function(t) {
      return k.isNumber(t) && t != +t
    }, k.isBoolean = function(t) {
      return t === !0 || t === !1 || "[object Boolean]" == u.call(t)
    }, k.isNull = function(t) {
      return null === t
    }, k.isUndefined = function(t) {
      return void 0 === t
    }, k.has = function(t, e) {
      return c.call(t, e)
    }, k.noConflict = function() {
      return t._ = e, this
    }, k.identity = function(t) {
      return t
    }, k.constant = function(t) {
      return function() {
        return t
      }
    }, k.property = function(t) {
      return function(e) {
        return e[t]
      }
    }, k.matches = function(t) {
      return function(e) {
        if (e === t) return !0;
        for (var i in t)
          if (t[i] !== e[i]) return !1;
        return !0
      }
    }, k.times = function(t, e, i) {
      for (var n = Array(Math.max(0, t)), r = 0; t > r; r++) n[r] = e.call(i, r);
      return n
    }, k.random = function(t, e) {
      return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    }, k.now = Date.now || function() {
      return (new Date).getTime()
    };
    var O = {
      escape: {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;"
      }
    };
    O.unescape = k.invert(O.escape);
    var j = {
      escape: new RegExp("[" + k.keys(O.escape).join("") + "]", "g"),
      unescape: new RegExp("(" + k.keys(O.unescape).join("|") + ")", "g")
    };
    k.each(["escape", "unescape"], function(t) {
      k[t] = function(e) {
        return null == e ? "" : ("" + e).replace(j[t], function(e) {
          return O[t][e]
        })
      }
    }), k.result = function(t, e) {
      if (null == t) return void 0;
      var i = t[e];
      return k.isFunction(i) ? i.call(t) : i
    }, k.mixin = function(t) {
      P(k.functions(t), function(e) {
        var i = k[e] = t[e];
        k.prototype[e] = function() {
          var t = [this._wrapped];
          return o.apply(t, arguments), H.call(this, i.apply(k, t))
        }
      })
    };
    var D = 0;
    k.uniqueId = function(t) {
      var e = ++D + "";
      return t ? t + e : e
    }, k.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var F = /(.)^/,
        N = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "	": "t",
          "\u2028": "u2028",
          "\u2029": "u2029"
        },
        L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    k.template = function(t, e, i) {
      var n;
      i = k.defaults({}, i, k.templateSettings);
      var r = new RegExp([(i.escape || F).source, (i.interpolate || F).source, (i.evaluate || F).source].join("|") + "|$", "g"),
          s = 0,
          o = "__p+='";
      t.replace(r, function(e, i, n, r, a) {
        return o += t.slice(s, a).replace(L, function(t) {
          return "\\" + N[t]
        }), i && (o += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"), n && (o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"), r && (o += "';\n" + r + "\n__p+='"), s = a + e.length, e
      }), o += "';\n", i.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
      try {
        n = new Function(i.variable || "obj", "_", o)
      } catch (a) {
        throw a.source = o, a
      }
      if (e) return n(e, k);
      var l = function(t) {
        return n.call(this, t, k)
      };
      return l.source = "function(" + (i.variable || "obj") + "){\n" + o + "}", l
    }, k.chain = function(t) {
      return k(t).chain()
    };
    var H = function(t) {
      return this._chain ? k(t).chain() : t
    };
    k.mixin(k), P(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
      var e = n[t];
      k.prototype[t] = function() {
        var i = this._wrapped;
        return e.apply(i, arguments), "shift" != t && "splice" != t || 0 !== i.length || delete i[0], H.call(this, i)
      }
    }), P(["concat", "join", "slice"], function(t) {
      var e = n[t];
      k.prototype[t] = function() {
        return H.call(this, e.apply(this._wrapped, arguments))
      }
    }), k.extend(k.prototype, {
      chain: function() {
        return this._chain = !0, this
      },
      value: function() {
        return this._wrapped
      }
    }), "function" == typeof define && define.amd && define("underscore", [], function() {
      return k
    })
  }.call(this), _.templateSettings = {
  evaluate: /\[%([\s\S]+?)%\]/g,
  interpolate: /\[%=([\s\S]+?)%\]/g,
  escape: /\[%-([\s\S]+?)%\]/g
},
  function(t, e) {
    if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(i, n, r) {
      t.Backbone = e(t, r, i, n)
    });
    else if ("undefined" != typeof exports) {
      var i = require("underscore");
      e(t, exports, i)
    } else t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
  }(this, function(t, e, i, n) {
    {
      var r = t.Backbone,
          s = [],
          o = (s.push, s.slice);
      s.splice
    }
    e.VERSION = "1.1.2", e.$ = n, e.noConflict = function() {
      return t.Backbone = r, this
    }, e.emulateHTTP = !1, e.emulateJSON = !1;
    var a = e.Events = {
          on: function(t, e, i) {
            if (!u(this, "on", t, [e, i]) || !e) return this;
            this._events || (this._events = {});
            var n = this._events[t] || (this._events[t] = []);
            return n.push({
              callback: e,
              context: i,
              ctx: i || this
            }), this
          },
          once: function(t, e, n) {
            if (!u(this, "once", t, [e, n]) || !e) return this;
            var r = this,
                s = i.once(function() {
                  r.off(t, s), e.apply(this, arguments)
                });
            return s._callback = e, this.on(t, s, n)
          },
          off: function(t, e, n) {
            var r, s, o, a, l, c, h, d;
            if (!this._events || !u(this, "off", t, [e, n])) return this;
            if (!t && !e && !n) return this._events = void 0, this;
            for (a = t ? [t] : i.keys(this._events), l = 0, c = a.length; c > l; l++)
              if (t = a[l], o = this._events[t]) {
                if (this._events[t] = r = [], e || n)
                  for (h = 0, d = o.length; d > h; h++) s = o[h], (e && e !== s.callback && e !== s.callback._callback || n && n !== s.context) && r.push(s);
                r.length || delete this._events[t]
              }
            return this
          },
          trigger: function(t) {
            if (!this._events) return this;
            var e = o.call(arguments, 1);
            if (!u(this, "trigger", t, e)) return this;
            var i = this._events[t],
                n = this._events.all;
            return i && c(i, e), n && c(n, arguments), this
          },
          stopListening: function(t, e, n) {
            var r = this._listeningTo;
            if (!r) return this;
            var s = !e && !n;
            n || "object" != typeof e || (n = this), t && ((r = {})[t._listenId] = t);
            for (var o in r) t = r[o], t.off(e, n, this), (s || i.isEmpty(t._events)) && delete this._listeningTo[o];
            return this
          }
        },
        l = /\s+/,
        u = function(t, e, i, n) {
          if (!i) return !0;
          if ("object" == typeof i) {
            for (var r in i) t[e].apply(t, [r, i[r]].concat(n));
            return !1
          }
          if (l.test(i)) {
            for (var s = i.split(l), o = 0, a = s.length; a > o; o++) t[e].apply(t, [s[o]].concat(n));
            return !1
          }
          return !0
        },
        c = function(t, e) {
          var i, n = -1,
              r = t.length,
              s = e[0],
              o = e[1],
              a = e[2];
          switch (e.length) {
            case 0:
              for (; ++n < r;)(i = t[n]).callback.call(i.ctx);
              return;
            case 1:
              for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s);
              return;
            case 2:
              for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o);
              return;
            case 3:
              for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o, a);
              return;
            default:
              for (; ++n < r;)(i = t[n]).callback.apply(i.ctx, e);
              return
          }
        },
        h = {
          listenTo: "on",
          listenToOnce: "once"
        };
    i.each(h, function(t, e) {
      a[e] = function(e, n, r) {
        var s = this._listeningTo || (this._listeningTo = {}),
            o = e._listenId || (e._listenId = i.uniqueId("l"));
        return s[o] = e, r || "object" != typeof n || (r = this), e[t](n, r, this), this
      }
    }), a.bind = a.on, a.unbind = a.off, i.extend(e, a);
    var d = e.Model = function(t, e) {
      var n = t || {};
      e || (e = {}), this.cid = i.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {}), n = i.defaults({}, n, i.result(this, "defaults")), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
    };
    i.extend(d.prototype, a, {
      changed: null,
      validationError: null,
      idAttribute: "id",
      initialize: function() {},
      toJSON: function() {
        return i.clone(this.attributes)
      },
      sync: function() {
        return e.sync.apply(this, arguments)
      },
      get: function(t) {
        return this.attributes[t]
      },
      escape: function(t) {
        return i.escape(this.get(t))
      },
      has: function(t) {
        return null != this.get(t)
      },
      set: function(t, e, n) {
        var r, s, o, a, l, u, c, h;
        if (null == t) return this;
        if ("object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n || (n = {}), !this._validate(s, n)) return !1;
        o = n.unset, l = n.silent, a = [], u = this._changing, this._changing = !0, u || (this._previousAttributes = i.clone(this.attributes), this.changed = {}), h = this.attributes, c = this._previousAttributes, this.idAttribute in s && (this.id = s[this.idAttribute]);
        for (r in s) e = s[r], i.isEqual(h[r], e) || a.push(r), i.isEqual(c[r], e) ? delete this.changed[r] : this.changed[r] = e, o ? delete h[r] : h[r] = e;
        if (!l) {
          a.length && (this._pending = n);
          for (var d = 0, f = a.length; f > d; d++) this.trigger("change:" + a[d], this, h[a[d]], n)
        }
        if (u) return this;
        if (!l)
          for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
        return this._pending = !1, this._changing = !1, this
      },
      unset: function(t, e) {
        return this.set(t, void 0, i.extend({}, e, {
          unset: !0
        }))
      },
      clear: function(t) {
        var e = {};
        for (var n in this.attributes) e[n] = void 0;
        return this.set(e, i.extend({}, t, {
          unset: !0
        }))
      },
      hasChanged: function(t) {
        return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
      },
      changedAttributes: function(t) {
        if (!t) return this.hasChanged() ? i.clone(this.changed) : !1;
        var e, n = !1,
            r = this._changing ? this._previousAttributes : this.attributes;
        for (var s in t) i.isEqual(r[s], e = t[s]) || ((n || (n = {}))[s] = e);
        return n
      },
      previous: function(t) {
        return null != t && this._previousAttributes ? this._previousAttributes[t] : null
      },
      previousAttributes: function() {
        return i.clone(this._previousAttributes)
      },
      fetch: function(t) {
        t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
        var e = this,
            n = t.success;
        return t.success = function(i) {
          return e.set(e.parse(i, t), t) ? (n && n(e, i, t), void e.trigger("sync", e, i, t)) : !1
        }, L(this, t), this.sync("read", this, t)
      },
      save: function(t, e, n) {
        var r, s, o, a = this.attributes;
        if (null == t || "object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n = i.extend({
          validate: !0
        }, n), r && !n.wait) {
          if (!this.set(r, n)) return !1
        } else if (!this._validate(r, n)) return !1;
        r && n.wait && (this.attributes = i.extend({}, a, r)), void 0 === n.parse && (n.parse = !0);
        var l = this,
            u = n.success;
        return n.success = function(t) {
          l.attributes = a;
          var e = l.parse(t, n);
          return n.wait && (e = i.extend(r || {}, e)), i.isObject(e) && !l.set(e, n) ? !1 : (u && u(l, t, n), void l.trigger("sync", l, t, n))
        }, L(this, n), s = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === s && (n.attrs = r), o = this.sync(s, this, n), r && n.wait && (this.attributes = a), o
      },
      destroy: function(t) {
        t = t ? i.clone(t) : {};
        var e = this,
            n = t.success,
            r = function() {
              e.trigger("destroy", e, e.collection, t)
            };
        if (t.success = function(i) {
          (t.wait || e.isNew()) && r(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
        }, this.isNew()) return t.success(), !1;
        L(this, t);
        var s = this.sync("delete", this, t);
        return t.wait || r(), s
      },
      url: function() {
        var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || N();
        return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
      },
      parse: function(t) {
        return t
      },
      clone: function() {
        return new this.constructor(this.attributes)
      },
      isNew: function() {
        return !this.has(this.idAttribute)
      },
      isValid: function(t) {
        return this._validate({}, i.extend(t || {}, {
          validate: !0
        }))
      },
      _validate: function(t, e) {
        if (!e.validate || !this.validate) return !0;
        t = i.extend({}, this.attributes, t);
        var n = this.validationError = this.validate(t, e) || null;
        return n ? (this.trigger("invalid", this, n, i.extend(e, {
          validationError: n
        })), !1) : !0
      }
    });
    var f = ["keys", "values", "pairs", "invert", "pick", "omit"];
    i.each(f, function(t) {
      d.prototype[t] = function() {
        var e = o.call(arguments);
        return e.unshift(this.attributes), i[t].apply(i, e)
      }
    });
    var p = e.Collection = function(t, e) {
          e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend({
            silent: !0
          }, e))
        },
        g = {
          add: !0,
          remove: !0,
          merge: !0
        },
        m = {
          add: !0,
          remove: !1
        };
    i.extend(p.prototype, a, {
      model: d,
      initialize: function() {},
      toJSON: function(t) {
        return this.map(function(e) {
          return e.toJSON(t)
        })
      },
      sync: function() {
        return e.sync.apply(this, arguments)
      },
      add: function(t, e) {
        return this.set(t, i.extend({
          merge: !1
        }, e, m))
      },
      remove: function(t, e) {
        var n = !i.isArray(t);
        t = n ? [t] : i.clone(t), e || (e = {});
        var r, s, o, a;
        for (r = 0, s = t.length; s > r; r++) a = t[r] = this.get(t[r]), a && (delete this._byId[a.id], delete this._byId[a.cid], o = this.indexOf(a), this.models.splice(o, 1), this.length--, e.silent || (e.index = o, a.trigger("remove", a, this, e)), this._removeReference(a, e));
        return n ? t[0] : t
      },
      set: function(t, e) {
        e = i.defaults({}, e, g), e.parse && (t = this.parse(t, e));
        var n = !i.isArray(t);
        t = n ? t ? [t] : [] : i.clone(t);
        var r, s, o, a, l, u, c, h = e.at,
            f = this.model,
            p = this.comparator && null == h && e.sort !== !1,
            m = i.isString(this.comparator) ? this.comparator : null,
            v = [],
            y = [],
            _ = {},
            b = e.add,
            w = e.merge,
            x = e.remove,
            k = !p && b && x ? [] : !1;
        for (r = 0, s = t.length; s > r; r++) {
          if (l = t[r] || {}, o = l instanceof d ? a = l : l[f.prototype.idAttribute || "id"], u = this.get(o)) x && (_[u.cid] = !0), w && (l = l === a ? a.attributes : l, e.parse && (l = u.parse(l, e)), u.set(l, e), p && !c && u.hasChanged(m) && (c = !0)), t[r] = u;
          else if (b) {
            if (a = t[r] = this._prepareModel(l, e), !a) continue;
            v.push(a), this._addReference(a, e)
          }
          a = u || a, !k || !a.isNew() && _[a.id] || k.push(a), _[a.id] = !0
        }
        if (x) {
          for (r = 0, s = this.length; s > r; ++r) _[(a = this.models[r]).cid] || y.push(a);
          y.length && this.remove(y, e)
        }
        if (v.length || k && k.length)
          if (p && (c = !0), this.length += v.length, null != h)
            for (r = 0, s = v.length; s > r; r++) this.models.splice(h + r, 0, v[r]);
          else {
            k && (this.models.length = 0);
            var P = k || v;
            for (r = 0, s = P.length; s > r; r++) this.models.push(P[r])
          }
        if (c && this.sort({
          silent: !0
        }), !e.silent) {
          for (r = 0, s = v.length; s > r; r++)(a = v[r]).trigger("add", a, this, e);
          (c || k && k.length) && this.trigger("sort", this, e)
        }
        return n ? t[0] : t
      },
      reset: function(t, e) {
        e || (e = {});
        for (var n = 0, r = this.models.length; r > n; n++) this._removeReference(this.models[n], e);
        return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend({
          silent: !0
        }, e)), e.silent || this.trigger("reset", this, e), t
      },
      push: function(t, e) {
        return this.add(t, i.extend({
          at: this.length
        }, e))
      },
      pop: function(t) {
        var e = this.at(this.length - 1);
        return this.remove(e, t), e
      },
      unshift: function(t, e) {
        return this.add(t, i.extend({
          at: 0
        }, e))
      },
      shift: function(t) {
        var e = this.at(0);
        return this.remove(e, t), e
      },
      slice: function() {
        return o.apply(this.models, arguments)
      },
      get: function(t) {
        return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
      },
      at: function(t) {
        return this.models[t]
      },
      where: function(t, e) {
        return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
          for (var i in t)
            if (t[i] !== e.get(i)) return !1;
          return !0
        })
      },
      findWhere: function(t) {
        return this.where(t, !0)
      },
      sort: function(t) {
        if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
        return t || (t = {}), i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
      },
      pluck: function(t) {
        return i.invoke(this.models, "get", t)
      },
      fetch: function(t) {
        t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
        var e = t.success,
            n = this;
        return t.success = function(i) {
          var r = t.reset ? "reset" : "set";
          n[r](i, t), e && e(n, i, t), n.trigger("sync", n, i, t)
        }, L(this, t), this.sync("read", this, t)
      },
      create: function(t, e) {
        if (e = e ? i.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
        e.wait || this.add(t, e);
        var n = this,
            r = e.success;
        return e.success = function(t, i) {
          e.wait && n.add(t, e), r && r(t, i, e)
        }, t.save(null, e), t
      },
      parse: function(t) {
        return t
      },
      clone: function() {
        return new this.constructor(this.models)
      },
      _reset: function() {
        this.length = 0, this.models = [], this._byId = {}
      },
      _prepareModel: function(t, e) {
        if (t instanceof d) return t;
        e = e ? i.clone(e) : {}, e.collection = this;
        var n = new this.model(t, e);
        return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
      },
      _addReference: function(t) {
        this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
      },
      _removeReference: function(t) {
        this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
      },
      _onModelEvent: function(t, e, i, n) {
        ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
      }
    });
    var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
    i.each(v, function(t) {
      p.prototype[t] = function() {
        var e = o.call(arguments);
        return e.unshift(this.models), i[t].apply(i, e)
      }
    });
    var y = ["groupBy", "countBy", "sortBy", "indexBy"];
    i.each(y, function(t) {
      p.prototype[t] = function(e, n) {
        var r = i.isFunction(e) ? e : function(t) {
          return t.get(e)
        };
        return i[t](this.models, r, n)
      }
    });
    var _ = e.View = function(t) {
          this.cid = i.uniqueId("view"), t || (t = {}), i.extend(this, i.pick(t, w)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
        },
        b = /^(\S+)\s*(.*)$/,
        w = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(_.prototype, a, {
      tagName: "div",
      $: function(t) {
        return this.$el.find(t)
      },
      initialize: function() {},
      render: function() {
        return this
      },
      remove: function() {
        return this.$el.remove(), this.stopListening(), this
      },
      setElement: function(t, i) {
        return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], i !== !1 && this.delegateEvents(), this
      },
      delegateEvents: function(t) {
        if (!t && !(t = i.result(this, "events"))) return this;
        this.undelegateEvents();
        for (var e in t) {
          var n = t[e];
          if (i.isFunction(n) || (n = this[t[e]]), n) {
            var r = e.match(b),
                s = r[1],
                o = r[2];
            n = i.bind(n, this), s += ".delegateEvents" + this.cid, "" === o ? this.$el.on(s, n) : this.$el.on(s, o, n)
          }
        }
        return this
      },
      undelegateEvents: function() {
        return this.$el.off(".delegateEvents" + this.cid), this
      },
      _ensureElement: function() {
        if (this.el) this.setElement(i.result(this, "el"), !1);
        else {
          var t = i.extend({}, i.result(this, "attributes"));
          this.id && (t.id = i.result(this, "id")), this.className && (t["class"] = i.result(this, "className"));
          var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
          this.setElement(n, !1)
        }
      }
    }), e.sync = function(t, n, r) {
      var s = k[t];
      i.defaults(r || (r = {}), {
        emulateHTTP: e.emulateHTTP,
        emulateJSON: e.emulateJSON
      });
      var o = {
        type: s,
        dataType: "json"
      };
      if (r.url || (o.url = i.result(n, "url") || N()), null != r.data || !n || "create" !== t && "update" !== t && "patch" !== t || (o.contentType = "application/json", o.data = JSON.stringify(r.attrs || n.toJSON(r))), r.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
        model: o.data
      } : {}), r.emulateHTTP && ("PUT" === s || "DELETE" === s || "PATCH" === s)) {
        o.type = "POST", r.emulateJSON && (o.data._method = s);
        var a = r.beforeSend;
        r.beforeSend = function(t) {
          return t.setRequestHeader("X-HTTP-Method-Override", s), a ? a.apply(this, arguments) : void 0
        }
      }
      "GET" === o.type || r.emulateJSON || (o.processData = !1), "PATCH" === o.type && x && (o.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
      });
      var l = r.xhr = e.ajax(i.extend(o, r));
      return n.trigger("request", n, l, r), l
    };
    var x = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
        k = {
          create: "POST",
          update: "PUT",
          patch: "PATCH",
          "delete": "DELETE",
          read: "GET"
        };
    e.ajax = function() {
      return e.$.ajax.apply(e.$, arguments)
    };
    var P = e.Router = function(t) {
          t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        },
        A = /\((.*?)\)/g,
        C = /(\(\?)?:\w+/g,
        S = /\*\w+/g,
        I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend(P.prototype, a, {
      initialize: function() {},
      route: function(t, n, r) {
        i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (r = n, n = ""), r || (r = this[n]);
        var s = this;
        return e.history.route(t, function(i) {
          var o = s._extractParameters(t, i);
          s.execute(r, o), s.trigger.apply(s, ["route:" + n].concat(o)), s.trigger("route", n, o), e.history.trigger("route", s, n, o)
        }), this
      },
      execute: function(t, e) {
        t && t.apply(this, e)
      },
      navigate: function(t, i) {
        return e.history.navigate(t, i), this
      },
      _bindRoutes: function() {
        if (this.routes) {
          this.routes = i.result(this, "routes");
          for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
        }
      },
      _routeToRegExp: function(t) {
        return t = t.replace(I, "\\$&").replace(A, "(?:$1)?").replace(C, function(t, e) {
          return e ? t : "([^/?]+)"
        }).replace(S, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
      },
      _extractParameters: function(t, e) {
        var n = t.exec(e).slice(1);
        return i.map(n, function(t, e) {
          return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
        })
      }
    });
    var T = e.History = function() {
          this.handlers = [], i.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
        },
        E = /^[#\/]|\s+$/g,
        M = /^\/+|\/+$/g,
        O = /msie [\w.]+/,
        j = /\/$/,
        D = /#.*$/;
    T.started = !1, i.extend(T.prototype, a, {
      interval: 50,
      atRoot: function() {
        return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
      },
      getHash: function(t) {
        var e = (t || this).location.href.match(/#(.*)$/);
        return e ? e[1] : ""
      },
      getFragment: function(t, e) {
        if (null == t)
          if (this._hasPushState || !this._wantsHashChange || e) {
            t = decodeURI(this.location.pathname + this.location.search);
            var i = this.root.replace(j, "");
            t.indexOf(i) || (t = t.slice(i.length))
          } else t = this.getHash();
        return t.replace(E, "")
      },
      start: function(t) {
        if (T.started) throw new Error("Backbone.history has already been started");
        T.started = !0, this.options = i.extend({
          root: "/"
        }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var n = this.getFragment(),
            r = document.documentMode,
            s = O.exec(navigator.userAgent.toLowerCase()) && (!r || 7 >= r);
        if (this.root = ("/" + this.root + "/").replace(M, "/"), s && this._wantsHashChange) {
          var o = e.$('<iframe src="javascript:0" tabindex="-1">');
          this.iframe = o.hide().appendTo("body")[0].contentWindow, this.navigate(n)
        }
        this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !s ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
        var a = this.location;
        if (this._wantsHashChange && this._wantsPushState) {
          if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
          this._hasPushState && this.atRoot() && a.hash && (this.fragment = this.getHash().replace(E, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
        }
        return this.options.silent ? void 0 : this.loadUrl()
      },
      stop: function() {
        e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), T.started = !1
      },
      route: function(t, e) {
        this.handlers.unshift({
          route: t,
          callback: e
        })
      },
      checkUrl: function() {
        var t = this.getFragment();
        return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
      },
      loadUrl: function(t) {
        return t = this.fragment = this.getFragment(t), i.any(this.handlers, function(e) {
          return e.route.test(t) ? (e.callback(t), !0) : void 0
        })
      },
      navigate: function(t, e) {
        if (!T.started) return !1;
        e && e !== !0 || (e = {
          trigger: !!e
        });
        var i = this.root + (t = this.getFragment(t || ""));
        if (t = t.replace(D, ""), this.fragment !== t) {
          if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i);
          else {
            if (!this._wantsHashChange) return this.location.assign(i);
            this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
          }
          return e.trigger ? this.loadUrl(t) : void 0
        }
      },
      _updateHash: function(t, e, i) {
        if (i) {
          var n = t.href.replace(/(javascript:|#).*$/, "");
          t.replace(n + "#" + e)
        } else t.hash = "#" + e
      }
    }), e.history = new T;
    var F = function(t, e) {
      var n, r = this;
      n = t && i.has(t, "constructor") ? t.constructor : function() {
        return r.apply(this, arguments)
      }, i.extend(n, r, e);
      var s = function() {
        this.constructor = n
      };
      return s.prototype = r.prototype, n.prototype = new s, t && i.extend(n.prototype, t), n.__super__ = r.prototype, n
    };
    d.extend = p.extend = P.extend = _.extend = T.extend = F;
    var N = function() {
          throw new Error('A "url" property or function must be specified')
        },
        L = function(t, e) {
          var i = e.error;
          e.error = function(n) {
            i && i(t, n, e), t.trigger("error", t, n, e)
          }
        };
    return e
  }),
  function() {
    var t, e, i, n, r = [].slice,
        s = {}.hasOwnProperty,
        o = function(t, e) {
          function i() {
            this.constructor = t
          }
          for (var n in e) s.call(e, n) && (t[n] = e[n]);
          return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
        };
    null == this.di && (this.di = {}), null == (t = this.di).provide && (t.provide = function(t) {
      var e;
      return e = window, t.split(".").map(function(t) {
        return e = null != e[t] ? e[t] : e[t] = {}
      }), e.ns_ = t, e
    }), null == (e = this.di).exists && (e.exists = function(t, e) {
      var i;
      return null == e && (e = window), i = !0, t.split(".").map(function(t) {
        return null != e[t] ? e = e[t] : i = !1
      }), i
    }), null == (i = this.di).eventbus && (i.eventbus = _.extend({}, Backbone.Events)), null == (n = this.di).mixOf && (n.mixOf = function() {
      var t, e, i;
      return e = arguments[0], i = 2 <= arguments.length ? r.call(arguments, 1) : [], t = function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        var n, r, s;
        for (o(e, t), r = 0, s = i.length; s > r; r++) n = i[r], _.extend(e.prototype, n.prototype);
        return e
      }(e)
    })
  }.call(this),
  function() {
    var t, e, i, n = [].slice;
    null == (t = window.di).singleton && (t.singleton = {}), null == (e = window.di.singleton).init && (e.init = function() {
      var t, e, i, r;
      return r = arguments[0], t = 2 <= arguments.length ? n.call(arguments, 1) : [], di.exists(r) ? (i = di.provide(r), null != i.instance_ && i.getInstance ? i.getInstance() : (e = function() {
        return i.apply(this, t)
      }, e.prototype = i.prototype, i.instance_ = new e, i.getInstance = function() {
        return this.instance_
      }, i.getInstance())) : void 0
    }), null == (i = window.di.singleton).destroy && (i.destroy = function(t) {
      var e;
      return di.exists(t) && (e = di.provide(t), null != e.instance_ && e.getInstance) ? (delete e.instance_, delete e.getInstance) : void 0
    })
  }.call(this), window.Channel = Class.extend({
  init: function(t) {
    if ("undefined" == typeof t) throw "AudioAddict.WP.Channel: FATAL: No parameters provided";
    if (!t.channels) throw "AudioAddict.WP.Channel: FATAL: channels not provided";
    var e = this;
    e.channels = t.channels, e.channelsByKey = {}, e.channelsById = {}, e.assetsByKey = {}, e.changedTs = null, $.each(e.channels, function() {
      e.channelsByKey[this.channel.key] = this.channel, e.channelsById[this.channel.id] = this.channel
    }), t.assets && $.each(t.assets.channel_assets, function() {
      e.channelsByKey[this.key] && (e.channelsByKey[this.key].assets = this.assets[0])
    }), $.log(LogPrefix() + "AudioAddict.WP.Channel: Initialized")
  },
  set: function(t, e) {
    return !this.channelsByKey[t] || this.channel && this.channel.key === t ? ($(document).trigger("Channel.Set", {
      id: e
    }), !1) : (this.changedTs = getUnixTimestamp(), this.channel = this.channelsByKey[t], $.log(LogPrefix() + "AudioAddict.WP.Channel: Channel set to {" + t + "}", this.channel), $(document).trigger("Channel.Set", this.channel), di.eventbus.trigger("webplayer:channel:change", this.channel), this.channel)
  },
  get: function() {
    return this.channel
  },
  getByKey: function(t) {
    return this.channelsByKey[t]
  },
  getById: function(t) {
    return this.channelsById[t]
  },
  getLastChangedTimestamp: function() {
    return this.changedTs
  }
}), di.provide("di.math.ExponentialBackoff"), di.math.ExponentialBackoff = function(t, e) {
  if (1 > t) throw "Initial value must be greater than zero.";
  if (t > e) throw "Max value must be be equal to or greater than the initial value.";
  this.initialValue_ = t, this.maxValue_ = e, this.currValue_ = t
}, di.math.ExponentialBackoff.prototype.currCount_ = 0, di.math.ExponentialBackoff.prototype.reset = function() {
  this.currValue_ = this.initialValue_, this.currCount_ = 0
}, di.math.ExponentialBackoff.prototype.getValue = function() {
  return this.currValue_
}, di.math.ExponentialBackoff.prototype.getMaxValue = function() {
  return this.maxValue_
}, di.math.ExponentialBackoff.prototype.getCount = function() {
  return this.currCount_
}, di.math.ExponentialBackoff.prototype.backoff = function() {
  this.currValue_ = Math.min(this.maxValue_, 2 * this.currValue_), this.currCount_++
},
  function(t, e, i) {
    function n(t) {
      function e(t) {
        return a ? t && t.type === a.type && t.track === a.track : !1
      }

      function n() {
        var t = getUnixTimestamp(),
            n = [];
        i.each(s, function() {
          this.started < t && !this.isJingle && !e(this) && (!this.ended || this.ended <= t + 25) ? n.push(this) : f.log("removing track from trackHistory: ", this)
        }), s = n.slice(0, l)
      }

      function r() {
        n(), f.log("sending metadata-history-update with tracks:", s), i(document).trigger("metadata-history-update", [s])
      }
      t = t || {};
      var s = [],
          o = null,
          a = null,
          l = t.maxHistory || 40;
      this.load = function(t) {
        s = t.slice(0), r()
      }, this.trackStarted = function(t) {
        a = t, o = getUnixTimestamp(), f.log("New now playing track: ", a), n()
      }, this.trackComplete = function(t) {
        var e = getUnixTimestamp();
        return t.type === a.type && t.track === a.track && 5 > e - o ? void f.log("ad caused early track-complete event, ignoring:", t) : t.isJingle ? void f.log("Track too short, ignoring", t) : (s.unshift(t), void r())
      }
    }

    function r(t, e) {
      var n = {
        started: getUnixTimestamp()
      };
      if (f.log("AudioAddict.WP.Metadata: Flash metadata received", e), e.audiosamplerate) f.log("Flash metadata is a premium track"), n = i.extend(n, {
        type: "track",
        track: e.title,
        apiDependent: !0
      });
      else if (e.adw_ad) {
        if (f.log("Flash metadata is an AdsWizz ad"), n = i.extend(n, {
          type: "advertisement",
          provider: "adswizz",
          banner: !0,
          track: A,
          apiDependent: !1,
          duration: parseInt(e.durationMilliseconds, 10)
        }), "string" == typeof e.metadata) {
          var r = e.metadata.indexOf("adswizzContext=");
          n.context = -1 !== r ? e.metadata.slice(r + 15) : null
        }
      } else if (e.StreamTitle && e.StreamTitle.indexOf("TSTAG") > -1) {
        f.log("Flash metadata is a TargetSpot ad");
        var o = m.wp.getLocale();
        if (o !== !1 && "United States" !== o) return !1;
        n = i.extend(n, {
          type: "advertisement",
          provider: "targetspot",
          duration: parseInt(i.trim(e.StreamTitle.slice(e.StreamTitle.indexOf("TSTAG") + 6)), 10),
          track: A,
          apiDependent: !1
        })
      } else e.StreamTitle ? (f.log("Flash metadata is a public track"), n = i.extend(n, {
        type: "track",
        track: e.StreamTitle,
        apiDependent: !0
      })) : (f.log("Flash metadata is unrecognised"), n = i.extend(n, {
        type: "track",
        track: "Track Information Unavailable",
        apiDependent: !1,
        accurate: !1
      }));
      return f.log("Flash metadata: {" + n.track + "}"), x && a(x, n) || k && a(k, n) ? (f.log("Flash metadata is duplicate of the current or previous track; ignoring {" + x.track + "}"), f.log("Resetting timecode for accuracy"), m.wp.timecode.reset(), !1) : (x = n, void(n.apiDependent ? s(n) : c(n)))
    }

    function s(t) {
      var e = function() {
        var i = o(t);
        i ? (c(i), T.getCount() > 0 && di.analytics.trackNonInteractiveEvent("WP.Error", "api-dependent track resolved after retries", JSON.stringify({
          retries: T.getCount(),
          item: {
            type: i.type,
            id: i.track_id || i.id || i.track || i
          }
        }))) : (0 === T.getCount() && c(t), f.log("No match found in history. Retrying API (#" + (T.getCount() + 1) + ") in " + T.getValue() / 1e3 + "s"), f.resolverTimeoutId = setTimeout(function() {
          d(e)
        }, T.getValue()), T.backoff())
      };
      f.resolverTimeoutId && (clearTimeout(f.resolverTimeoutId), f.resolverTimeoutId = null), T.reset(), d(e)
    }

    function o(t) {
      var e = _.map(_.pluck(b, "track"), O),
          i = O(M(t.track));
      window._forceTrackHistoryNoMatch && (i += Math.random().toString());
      var n = e ? e.indexOf(i) : -1,
          r = b[n];
      return r ? (f.log("Found match {" + i + "} amongst API results"), 0 === n && C && (f.log("Using existing local start time:", t.started), r.started = t.started, r.ended = r.started + r.length)) : f.log("ERROR: Could not find {" + i + "} amongst API metadata; using Flash metadata only"), r
    }

    function a(t, e) {
      return "track" === t.type ? t.track === e.track : t.provider === e.provider && "adswizz" === t.provider ? !1 : t.track === e.track && t.provider === e.provider
    }

    function l() {
      var t = E[m.wp.member.getAccess()][m.wp.streamlist.getCurrentBitrate()];
      return "undefined" == typeof t ? 0 : t
    }

    function u(t) {
      {
        var e;
        i.extend(!0, {}, t)
      }
      "advertisement" === t.type && (t.length = t.duration, t.url = null, t.banner = null, t.track = M(t.track), 0 === t.track.trim().length && (t.track = A), "undefined" == typeof t.provider && (t.provider = "internal"), "internal" === t.provider && (t.url = P, t.track.indexOf(" - ") > -1 && (e = t.track.split(" - "), t.track = e[0], t.url = e[1]), "object" == typeof t.ad && (t.ad.banner && t.ad.banner.length > 0 && (t.banner = t.ad.banner), t.ad.url && t.ad.url.length > 0 && (t.url = t.ad.url)))), t.isJingle = "track" == t.type && t.length > 0 && t.length < 30, t.timeDeterminate = !0, t.started ? t.started += l() : (t.started = getUnixTimestamp(), t.timeDeterminate = !1), t.length ? t.ended = t.started + t.length : (t.length = 0, t.ended = null, t.timeDeterminate = !1), t.normalized = !0
    }

    function c(t) {
      if (C || (C = !0), f.log("Metadata parsed", t), w && (w = null), t.normalized || u(t), t.timeDeterminate && t.ended < getUnixTimestamp() && (f.log("end time for current track is in the past, time is indeterminate"), t.timeDeterminate = !1), "track" == t.type) {
        if (m.wp.adManager.isExternal()) return f.log("External ad is playing {" + m.wp.adManager.type() + "}, deferring track change", t), w = t, void i(document).on("ad-end", h);
        f.log("External ad is NOT playing, triggering track begin event", t), S.trackStarted(t), i(document).trigger("metadata-track", [t]), di.eventbus.trigger("webplayer:track:begin", t)
      } else f.log("Triggering ad event", t), i(document).trigger("ad-new", [t]);
      null != k && (k.ended || (k.ended = Math.floor((Date.now() - 100) / 1e3)), f.log("Triggering track end event", k), S.trackComplete(k), i(document).trigger("metadata-track-complete", [k]), f.log("Triggering track end event: complete")), k = t
    }

    function h(t, e) {
      f.log("External ad ended; triggering deferred track change", w, t, e), i(document).off("ad-end", h), w ? c(w) : f.log("Deferred track change information unavailable")
    }

    function d(t) {
      var e = m.wp.getState();
      if ("connected" !== e) return f.log("Not allowed to query the API because player is currently {" + e + "}"), !1;
      var n = function(e) {
            y = v;
            var n = "premium" === m.wp.member.getAccess();
            f.log("API metadata received", e), b = [], i(e).each(function() {
              this.started -= m.wp.timeKeeper.serverTimeOffsetSec, u(this), ("advertisement" != this.type || !n && this.url) && b.push(this)
            }), t(), S.load(b), i(document).trigger("metadata-load", [b])
          },
          r = function(t) {
            if (f.log("track history request failed"), y--, 429 === t.statusCode()) f.log("ERROR: 429 reponse code; halting requests");
            else if (y > -1) {
              var e = Math.round(29e3 * Math.random() + 1e3);
              f.log("retry " + (v - y) + "/" + v + " in: " + e / 1e3 + " seconds"), setTimeout(function() {
                I.getChannel(g, n, r)
              }, e)
            } else f.log(v + " retries exahusted")
          };
      I.getChannel(g, n, r)
    }
    var f, p, g, m = (NS("AudioAddict.Util"), NS("AudioAddict.WP")),
        v = 3,
        y = v,
        b = [],
        w = null,
        x = null,
        k = null,
        P = "",
        A = "Sponsored Message",
        C = !1,
        S = null,
        I = new AudioAddict.API.TrackHistory(AudioAddict.API.Config.url, AudioAddict.API.Config.network),
        T = new di.math.ExponentialBackoff(Math.round(500 + 1e3 * Math.random()), 12e4),
        E = {
          "public": {
            40: 26,
            64: 26
          },
          premium: {
            40: 12,
            64: 7,
            96: 3,
            128: 1
          }
        },
        M = _.memoize(function(t) {
          return (t || "").replace(/ADWTAG_\d{5}_START=0|TSTAG_\d{2}|\[SJ247\]/g, "")
        }),
        O = _.memoize(function(t) {
          return t.replace(/[^A-z]/g, "").toLowerCase()
        });
    NS(t).Metadata = e.extend({
      NS: t + ".Metadata",
      _required: ["url"],
      init: function(t) {
        f = this, p = t.url, P = NS("AudioAddict.API").Static.urlPremium, S = new n, i(document).on("player-metadata", r), i(document).on("Channel.Set", function(t, e) {
          g = e.id
        }), i(document).on("wp-disconnect wp-stop", function() {
          x = k = w = null, C = !1
        }), f.log("Initialized")
      }
    })
  }("AudioAddict.WP", AudioAddict.Modules.Base, jQuery), NS("AudioAddict.WP").Error = {
  BufferTimeout: 1,
  FlashBlocked: 2
},
  function(t, e) {
    function i() {
      function i() {
        modal("Streaming server unavailable", e("<div>").append(e("<p>", {
          style: "color: red;"
        }).html(e("<strong>").html("Sorry, we were unable to connect to the streaming server.")), e("<p>").append("You can ", e("<a>", {
          href: ""
        }).html("retry connecting").click(function(t) {
          t.preventDefault(), f.play(), e(this).closest(".ui-dialog").find("button").click()
        }), " or ", e("<a>", {
          href: ""
        }).html("reload the player.")), e("<p>").html("If you continue to experience problems, use the <em>Help</em> link at the top of the page to contact our support team.")), null, 400, "connect-timeout")
      }

      function n(t) {
        t = t || "Loading&hellip;", e("body").append('<div id="blocker" class="transparent"><p>' + t + "</p></div>")
      }

      function r() {
        e("#blocker").remove()
      }

      function s() {
        e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Ready"), g = !0
      }

      function o() {
        u("connected"), C = 0, clearTimeout(I), I = null, e(document).trigger("wp-connect", f.channel.get()), di.eventbus.trigger("webplayer:stream:connect", f.channel.get()), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Connected")
      }

      function a() {
        u("disconnected"), e(document).trigger("wp-disconnect"), di.eventbus.trigger("webplayer:stream:disconnect"), f.stop(), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Disconnected")
      }

      function l(t, i) {
        t == AudioAddict.WP.Error.BufferTimeout ? (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer._onError(): Buffer timeout triggered"), C += 1, a(), f.connect()) : e.log(LogPrefix() + "AudioAddict.WP.WebPlayer._onError(): Error triggered: " + t + ("undefined" != typeof i ? ": " + i : ""))
      }

      function u(t) {
        c = t
      }
      var c, h, d = (NS("AudioAddict.Util"), NS("AudioAddict.API"), NS("AudioAddict.WP")),
          f = this,
          p = !1,
          g = !1,
          findme = new Player,
          v = !1,
          y = !1,
          _ = 0,
          b = 200,
          w = 50,
          x = w,
          k = 1,
          P = null,
          A = t.history && history.pushState,
          C = 0,
          S = 300,
          I = null;
      t.onerror = function(t, i, n) {
        e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: window.onerror triggered; error={" + t + "}, url={" + i + "}, line={" + n + "}")
      }, NS("AudioAddict.WP").hasFocus = !0, e(t).bind("blur focusout", function() {
        AudioAddict.WP.hasFocus = !1
      }), e(t).bind("focus focusin", function() {
        AudioAddict.WP.hasFocus = !0
      }), this.init = function(n) {
        if ("undefined" == typeof n) throw "AudioAddict.WP.WebPlayer: FATAL: No parameters provided";
        if (!n.channel) throw "AudioAddict.WP.WebPlayer: FATAL: channel not provided";
        if (!n.channels) throw "AudioAddict.WP.WebPlayer: FATAL: channels not provided";
        if (!n.member) throw "AudioAddict.WP.WebPlayer: FATAL: member not provided";
        if (v || (e.log("                              "), e.log("\u250f\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2513"), e.log("\u2503 \u2588\u2593\u2592\u2591  WebPlayer 3.0   \u2591\u2592\u2593\u2588 \u2503"), e.log("\u2520\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2528"), e.log("\u2503     \xa9 AudioAddict Inc      \u2503"), e.log("\u2503    All Rights Reserved     \u2503"), e.log("\u2517\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u251b"), e.log("                              "), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Using Flash {" + swfobject.getFlashPlayerVersion().major + "." + swfobject.getFlashPlayerVersion().minor + "." + swfobject.getFlashPlayerVersion().release + "}")), v || (x = e.cookie("volume") || w, k > x && (x = k), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Volume initialized to {" + x + "}")), null == this.timeKeeper && n.timeKeeper && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.TimeKeeper"), this.timeKeeper = new TimeKeeper(n.timeKeeper)), null == this.member && n.member && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.Member"), this.member = new Member(n.member)), null == this.streamlist && (n.streamlist.channel = n.channel, e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Instantiating AudioAddict.WP.Streamlist"), this.streamlist = new Streamlist(n.streamlist), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.Streamlist"), this.streamlist.init()), null == this.uiChannel && n.uiChannel && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.UIChannel"), this.uiChannel = new UIChannel(n.uiChannel)), null == this.channel && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.Channel"), this.channel = new Channel({
          channels: n.channels,
          assets: n.assets
        }), this.channel.set(n.channel, n.channelId)), null == this.adManager && n.adManager && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.AdManager"), this.adManager = new AdManager(n.adManager)), null == this.uiPlay && n.uiPlay && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.UIPlay"), this.uiPlay = new UIPlay(n.uiPlay)), null == this.ping && n.ping && (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initializing AudioAddict.WP.Ping"), this.ping = new Ping(n.ping)), n.connectAttemptTimeout && (S = n.connectAttemptTimeout), v || (n.player.onError = function(t) {
          l(t)
        }, n.player.onReady = function() {
          e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Player is OMG!READY!!")
        }, n.player.onConnect = function() {
          o()
        }, setTimeout(function() {
          e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Player is not ready yet, reinitializing \u27f2"), findme.init(n.player)
        }, 100), v = !0), y) throw "AudioAddict.WP.WebPlayer: FATAL: Initialization aborted prematurely due to forced stop; WP must be reloaded";
        var r = !this.streamlist.isReady() || "ready" != findme.getState();
        return r ? (setTimeout(function() {
          var t = f.streamlist.isReady() ? "flash" : "streamlist";
          if (!(++_ < b)) throw "flash" === t ? e(document).trigger("WP.InitError") : i(), "AudioAddict.WP.WebPlayer: FATAL: " + t + " is not ready yet, giving up after " + _ + " attempts";
          e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: %s is not ready yet, reinitializing: attempt %s/%s \u27f2", t, _, b), f.init(n)
        }, 200), !1) : (e(document).bind("ui-volume", function(t, e) {
          0 === e ? f.mute() : e > 0 && f.setVolume(e)
        }), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Initialized"), s(), f.setVolume(x), n.onReady && (t.__onReady = n.onReady, t.__onReady()), this)
      }, this.play = function() {
        this.streamlist.isReady() ? "connecting" != this.getState() ? (e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Play"), f.connect()) : e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Play already requested {" + this.getState() + "}") : e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Cannot play without Streamlist")
      }, this.stop = function(t) {
        e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Stop"), u("stopped"), f.adManager.stop(), findme.stop(), e(document).trigger("wp-stop"), y = t || !1
      }, this.setVolume = function(t) {
        clearTimeout(P), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Volume {" + t + "}"), f.adManager.isExternal() || findme.setVolume(t), f.isMuted() && f.unMute(), x = t, P = setTimeout(function() {
          e.cookie("volume", t, {
            expires: 3650,
            path: "/"
          })
        }, 1e3), e(document).trigger("wp-volume", {
          percentage: t
        })
      }, this.getVolume = function() {
        return x
      }, this.getPlayerVolume = function() {
        return findme.getVolume()
      }, this.isMuted = function() {
        return findme.isMuted() || f.adManager.isMuted()
      }, this.muteToggle = function() {
        f.isMuted() ? f.unMute() : f.mute()
      }, this.mute = function() {
        e(document).trigger("wp-mute", {
          mute: !0
        }), f.adManager.isExternal() ? f.adManager.mute() : findme.mute()
      }, this.unMute = function() {
        f.adManager.isExternal() ? e(document).trigger("wp-volume", {
          percentage: k > x ? k : x
        }) : (findme.unMute(), k > x && f.setVolume(k)), e(document).trigger("wp-mute", {
          mute: !1,
          volume: f.getVolume()
        })
      }, this.fadeIn = function(t, e) {
        findme.fadeIn(function() {
          t && t.call()
        }, e)
      }, this.fadeOut = function(t) {
        findme.fadeOut(function() {
          t && t.call()
        })
      }, this.tempMute = findme.tempMute, this.tempUnMute = findme.tempUnMute, this.setChannel = function(i) {
        e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Restarting for channel {" + i + "}\u2026 kthxbai!"), n(), this.stop(), t.location = d.urlBase + i
      }, this.changeChannel = function(i) {
        var s = this.channel.get(),
            o = this.channel.set(i);
        if (o !== !1) {
          if (NS("AudioAddict.WP").embeddedPlayer) return void(t.location = t.location.href.replace(s.key, i));
          if (!A) return this.setChannel(i);
          n(), this.streamlist.updateParams({
            channel: o.key
          }, function() {
            var t = d.urlBase + o.key;
            r(), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Changing channel to {" + o.key + "}"), f.stop(), history.pushState(null, "", t), document.title = document.title.replace(s.name, o.name), e(document).trigger("Channel.Changed", o).trigger("Location.Changed"), f.connect()
          })
        }
      }, this.connect = function() {
        var t = this.streamlist.getStream(),
            n = this;
        e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Connecting to {" + t + "}\u2026"), u("connecting"), null === I && (C = 0, I = setTimeout(function() {
          i(), e.log(LogPrefix() + "AudioAddict.WP.WebPlayer: Connect attempt timeout reached, stopping."), n.stop(), I = null, e(document).trigger("wp-error")
        }, 1e3 * S)), findme.load(t), e(document).trigger("wp-connecting", C)
      }, this.getChannel = function() {
        return h
      }, this.getState = function() {
        return c
      }, this.getAssets = function() {
        return h.getAssets()
      }, this.setLocale = function(t) {
        p = t
      }, this.getLocale = function() {
        return p
      }
    }
    t.WebPlayer = i
  }(window, window.jQuery),
  function(t, e, i, n) {
    var r = {
      windowBlurTimeout: 5e3
    };
    NS(t).Auth = e.extend({
      NS: t + ".Auth",
      _required: ["loginPopupId", "urlLogin", "urlLogout"],
      init: function(t) {
        this._super(n.extend(r, t));
        var e, s = n(this.params.loginPopupId),
            o = n(this.params.loginButtonId),
            a = n(this.params.logoutButtonId),
            l = s.find("form"),
            u = (i.WP, null),
            c = null;
        e = this.params.windowBlurTimeout, u = new i.Modules.Auth({
          urlLogin: this.params.urlLogin,
          urlLogout: this.params.urlLogout,
          afterLogin: n.noop,
          afterLogout: function() {
            window.location.reload(!0)
          }
        }), a.click(function(t) {
          u.logout(), t.preventDefault()
        }), l.length > 0 && (o.click(function(t) {
          s.toggleClass("open"), t.preventDefault()
        }), n(window).bind("blur focusout", function() {
          null !== c && clearTimeout(c), s.hasClass("open") && (c = setTimeout(function() {
            s.removeClass("open")
          }, e))
        }), n(window).bind("focus focusin", function() {
          null !== c && (clearTimeout(c), c = null)
        }))
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery),
  function(t, e, i) {
    "use strict";

    function n(t) {
      function e(t, e) {
        var i, n;
        for (i = 0, n = e.length; n > i; i += 1)
          if (e[i] > t) return e[i];
        return t
      }

      function n(t, e) {
        var i;
        for (i = e.length - 1; i >= 0; i -= 1)
          if (e[i] < t) return e[i];
        return t
      }

      function r() {
        g && (h = t.find(".wrap").scrollLeft(), y.toggleClass("hidden", 0 === h), b.toggleClass("hidden", h > n(f, p)))
      }

      function s(e, i) {
        var n = "undefined" != typeof i ? !!i : !0;
        v = !0, n ? t.find(".wrap").animate({
          scrollLeft: e
        }, {
          duration: 250,
          easing: "swing",
          step: function() {
            v = !0
          },
          complete: function() {
            r()
          }
        }) : (t.find(".wrap").scrollLeft(e), r())
      }

      function o() {
        s(Math.min(e(h, p), f))
      }

      function a() {
        s(n(h, p))
      }

      function u() {
        s(0, !1)
      }

      function c() {
        d = t.find(".wrap").outerWidth(), f = t.find(".lists ul").length * m - d, p = [], t.find(".lists ul").each(function(t) {
          p.push(t * m)
        }), u()
      }
      var h = 0,
          d = 0,
          f = 0,
          p = [],
          g = !1,
          v = !1,
          y = null,
          b = null;
      return function() {
        d = t.find(".wrap").outerWidth(), y = i("<a>", {
          "class": "paddle-left hidden",
          href: "#",
          "data-event": "WP.ChannelList.Previous"
        }).html("&lt;"), b = i("<a>", {
          "class": "paddle-right hidden",
          href: "#",
          "data-event": "WP.ChannelList.Next"
        }).html("&gt;"), t.append(y, b), t.find(".wrap").scroll(function() {
          v ? v = !1 : r()
        }), g = !0, c(), i(document).on({
          "WP.ChannelList.Previous": function() {
            return a(), !1
          },
          "WP.ChannelList.Next": function() {
            return o(), !1
          }
        }), i(window).on("resize", _.debounce(function() {
          l(), c()
        }, 250))
      }(), {
        rehash: c
      }
    }

    function r(t, e, n, r) {
      function s(t) {
        var e, i, n = [];
        for (e = 0, i = t.length; i > e; e += 1) n.push(t[e].channel.key);
        return n
      }

      function o(t, n) {
        var r, s, o, a, l = [],
            u = g,
            c = [];
        if ("undefined" == typeof n && (n = !0), n)
          for (r = 0; r < t.length; r += 1) l.push(e.filter("[data-channel=" + t[r] + "]")[0]);
        else e.each(function() {
          i.inArray(i(this).attr("data-channel"), t) > -1 && l.push(this)
        });
        for (a = Math.ceil(l.length / u), r = 0; a > r; r += 1)
          for (c[r] = i("<ul>"), s = r * u, o = Math.max(s + u, l.length); o > s; s += 1) c[r].append(l[s]);
        return c
      }

      function l(e) {
        if (t.hasOwnProperty(e) && n.fadeOut(150, "linear", function() {
          var n, a, l = o(s(t[e].channel_filter.channels), "default" !== e);
          for (i(this).find("ul").remove(), i(this).width(m * l.length), n = 0, a = l.length; a > n; n += 1) i(this).append(l[n]);
          r.rehash(), i(this).fadeIn(150)
        }), f.length > 0) {
          var a, l, u, c = s(t[e].channel_filter.channels);
          for (f.find("option:not(:first)").remove(), a = 0; a < p.length; a++) l = i(p[a]), u = i.inArray(l.data("channel"), c) > -1, u && f.append(l)
        }
      }
      var u;
      ! function() {
        var e = "";
        u = i("<menu>", {
          "class": "filters"
        });
        for (e in t) t.hasOwnProperty(e) && u.append(i("<li>", {
          "data-filter": e
        }).append(i("<a>", {
          href: "#/" + e,
          "class": "button narrow",
          "data-event": "WP.ChannelList.Filter"
        }).html(t[e].channel_filter.name)));
        u.find("li:last-child").addClass("last"), u.find("li[data-filter=default] a").html("All").addClass("selected"), i(document).on({
          "WP.ChannelList.Filter": function(t) {
            var e = i(t.target).closest(".button"),
                n = e.closest("li").attr("data-filter");
            return l(n), u.find("li a.selected").removeClass("selected"), e.addClass("selected"), d.length > 0 && d.find('[value="' + n + '"]').prop("selected", !0), !1
          }
        })
      }(),
        function() {
          var e = "";
          if (d.length) {
            for (e in t) t.hasOwnProperty(e) && d.append(i("<option>", {
              value: e
            }).html(t[e].channel_filter.name));
            d.on("change", function() {
              u.find("li a").removeClass("selected"), u.find('li[data-filter="' + i(this).val() + '"] a').addClass("selected"), l(i(this).val())
            }), p = f.find("option").clone(), f.on("change", function() {
              var t = i(this).find("option:selected").data("channel");
              AudioAddict.WP.wp.changeChannel(t), a()
            })
          }
        }(), this.getMenu = function() {
        return u
      }
    }

    function s(t) {
      var e = {
        open: {
          listOpacity: 1,
          listHeight: v,
          menuOpacity: 1,
          menuBottom: 0,
          open: !0
        },
        close: {
          listOpacity: 0,
          listHeight: 0,
          menuOpacity: 0,
          menuBottom: -52,
          open: !1
        }
      };
      t = t || (k ? "close" : "open"), c.stop().animate({
        opacity: e[t].listOpacity,
        height: e[t].listHeight
      }, {
        duration: 200,
        easing: "linear",
        complete: function() {
          i(this).toggleClass("open", e[t].open), k = e[t].open
        }
      }), c.find(".filter-menu-wrap").stop().animate({
        opacity: e[t].menuOpacity,
        bottom: e[t].menuBottom
      }, {
        duration: 250,
        easing: "swing"
      })
    }

    function o(t) {
      t = t || !k, u.toggleClass("open", t), u.find(".arrow").toggleClass("icon-arrow-up-solid", t).toggleClass("icon-arrow-down-solid", !t), s(t ? "open" : "close")
    }

    function a() {
      o(!1)
    }

    function l() {
      var t = c.find(".lists"),
          e = t.find("ul").length;
      m = t.find("ul:first").width(), t.width(e * m)
    }
    var u, c, h, d, f, p, g, m, v, y, b = [],
        w = null,
        x = null,
        k = !1,
        P = {
          channelsPerList: 7,
          channelListWidth: 145,
          channelListHeight: 219,
          windowBlurTimeout: 5e3
        };
    NS(t).ChannelSelector = e.extend({
      NS: t + ".ChannelSelector",
      _required: ["channelSelectorId", "channelListId", "filters"],
      init: function(t) {
        return this._super(i.extend(P, t)), u = i(this.params.channelSelectorId), c = i(this.params.channelListId), h = c.find("li[data-channel]"), d = i(this.params.mobileFilterList), f = i(this.params.mobileChannelList), b = this.params.filters, g = this.params.channelsPerList, m = c.find("ul:first").width(), v = this.params.channelListHeight, y = this.params.windowBlurTimeout, 0 === u.length ? void this.log("Channel selector element not found, aborting.") : 0 === c.length ? void this.log("Channel list container not found, aborting.") : (l(), h.filter("[data-channel=" + AudioAddict.API.Config.channel + "]").addClass("selected"), w = new r(b, h, c.find(".lists"), new n(c)), c.append(i("<div>", {
          "class": "filter-menu-wrap"
        }).append(w.getMenu())), i(window).bind("blur focusout", function() {
          null !== x && clearTimeout(x), k && (x = setTimeout(function() {
            a()
          }, y))
        }), i(window).bind("focus focusin", function() {
          null !== x && (clearTimeout(x), x = null)
        }), void i(document).on({
          "WP.ChannelNavToggle": function(t) {
            t.preventDefault(), o()
          },
          "WP.ChangeChannel": function(t) {
            var e = i(t.target).closest("a").attr("href").split("/").pop();
            return AudioAddict.WP.wp.changeChannel(e), a(), h.removeClass("selected").filter("[data-channel=" + e + "]").addClass("selected"), !1
          },
          "Channel.Favorite.Added": function(t, e) {
            h.filter("[data-channel=" + e.key + "]").addClass("favorite")
          },
          "Channel.Favorite.Removed": function(t, e) {
            h.filter("[data-channel=" + e.key + "]").removeClass("favorite")
          }
        }))
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, jQuery),
  function(t, e) {
    function i() {
      this.createGUID = function() {
        return this._pfx = this._pfx || ["fb", Math.floor(1e4 * Math.random() + (new Date).getTime()), ""].join("-"), _.uniqueId(this._pfx)
      }, this.getXFBML = function(t, e, i, n) {
        var r = {
          href: t,
          id: n || this.createGUID(),
          numPosts: e || 5,
          width: i
        };
        return AudioAddict.UI.Templates.render("shared/fb_comment_box", r)
      }, this.embedComments = function(i, n, s) {
        n = t(n);
        var o = this.createGUID(),
            a = n.parent().width(),
            l = this.getXFBML(i, n.data("num-posts"), a, o),
            u = t(l).data();
        t.log(LogPrefix(r) + ".embedComments(): XFBML slug guid: {%s} created with opts: ", o, u), n.append(l);
        var c = function() {
              e.FB.XFBML.parse(n[0], function() {
                s.call(n[0], o)
              })
            },
            h = function() {
              var t = n.find("iframe");
              t.css("opacity", 0), setTimeout(function() {
                t.css("opacity", 1)
              }, 100), e.FB.Event.unsubscribe("xfbml.render", h)
            },
            d = function() {
              e.FB.Event.subscribe("xfbml.render", h), c()
            };
        e.FB ? d() : (t.log(LogPrefix(r) + ": waiting for fb sdk..."), t(document).on("FB.Init", d))
      }, this.trackCommentUrl = function(t) {
        return "http://" + e.location.host + "/tracks/" + t.track_id + "/" + AudioAddict.API.Channels.getChannelById(t.channel_id).key
      }, this.closeComments = function(e) {
        return t.log(LogPrefix(r) + ": closing comments."), t(e || document.body).find('[data-event="Comments.Toggle"], [data-event="TrackHistoryComments.Toggle"]').filter(".expanded").trigger("click"), this
      }, this.getGraphDataForTrack = function(e, i) {
        if (!e) throw "Invalid pageUrl: " + e;
        try {
          this._jqxhr.abort()
        } catch (n) {}
        var s = ["url", "normalized_url", "share_count", "like_count", "comment_count", "total_count", "commentsbox_count", "comments_fbid", "click_count"],
            o = "link_stat",
            a = "url",
            l = e,
            u = "SELECT " + s.join(",") + " FROM " + o + " WHERE " + a + '= "' + l + '"';
        this._jqxhr = t.getJSON("https://graph.facebook.com/fql?q=" + encodeURIComponent(u) + "&callback=?", function(e) {
          t.log(LogPrefix(r) + ".getGraphDataForTrack: received openGraph data: ", e.data[0]), i(e.data[0])
        })
      }
    }
    var n, r = "AudioAddict.Modules.FB";
    if (!t.duped(r)) {
      NS("AudioAddict.Modules").FB = new i;
      var s = function() {
        var i, r, s, o, a = t(e).width();
        n !== a && (n = a, t(".fb-comments").each(function() {
          i = t(this), r = i.find("iframe"), s = r.prop("src").split("?"), o = t.deparam(s[1]), o.width = i.parent().parent().width(), s = s[0] + "?" + t.param(o), r.attr("src", s)
        }))
      };
      n = t(e).width(), t(e).on("resize", _.debounce(s, 250))
    }
  }(jQuery, this),
  function() {
    "use strict";

    function t(t) {
      function e(e, n) {
        var s, g, m = e == window,
            v = n && void 0 !== n.message ? n.message : void 0;
        if (n = t.extend({}, t.blockUI.defaults, n || {}), !n.ignoreIfBlocked || !t(e).data("blockUI.isBlocked")) {
          if (n.overlayCSS = t.extend({}, t.blockUI.defaults.overlayCSS, n.overlayCSS || {}), s = t.extend({}, t.blockUI.defaults.css, n.css || {}), n.onOverlayClick && (n.overlayCSS.cursor = "pointer"), g = t.extend({}, t.blockUI.defaults.themedCSS, n.themedCSS || {}), v = void 0 === v ? n.message : v, m && f && i(window, {
            fadeOut: 0
          }), v && "string" != typeof v && (v.parentNode || v.jquery)) {
            var y = v.jquery ? v[0] : v,
                _ = {};
            t(e).data("blockUI.history", _), _.el = y, _.parent = y.parentNode, _.display = y.style.display, _.position = y.style.position, _.parent && _.parent.removeChild(y)
          }
          t(e).data("blockUI.onUnblock", n.onUnblock);
          var b, w, x, k, P = n.baseZ;
          b = t(c || n.forceIframe ? '<iframe class="blockUI" style="z-index:' + P++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + n.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'), w = t(n.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + P++ +';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + P++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), n.theme && m ? (k = '<div class="blockUI ' + n.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (P + 10) + ';display:none;position:fixed">', n.title && (k += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || "&nbsp;") + "</div>"), k += '<div class="ui-widget-content ui-dialog-content"></div>', k += "</div>") : n.theme ? (k = '<div class="blockUI ' + n.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (P + 10) + ';display:none;position:absolute">', n.title && (k += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || "&nbsp;") + "</div>"), k += '<div class="ui-widget-content ui-dialog-content"></div>', k += "</div>") : k = m ? '<div class="blockUI ' + n.blockMsgClass + ' blockPage" style="z-index:' + (P + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + n.blockMsgClass + ' blockElement" style="z-index:' + (P + 10) + ';display:none;position:absolute"></div>', x = t(k), v && (n.theme ? (x.css(g), x.addClass("ui-widget-content")) : x.css(s)), n.theme || w.css(n.overlayCSS), w.css("position", m ? "fixed" : "absolute"), (c || n.forceIframe) && b.css("opacity", 0);
          var A = [b, w, x],
              C = t(m ? "body" : e);
          t.each(A, function() {
            this.appendTo(C)
          }), n.theme && n.draggable && t.fn.draggable && x.draggable({
            handle: ".ui-dialog-titlebar",
            cancel: "li"
          });
          var S = d && (!t.support.boxModel || t("object,embed", m ? null : e).length > 0);
          if (h || S) {
            if (m && n.allowBodyStretch && t.support.boxModel && t("html,body").css("height", "100%"), (h || !t.support.boxModel) && !m) var I = l(e, "borderTopWidth"),
                                                                                                                                             T = l(e, "borderLeftWidth"),
                                                                                                                                             E = I ? "(0 - " + I + ")" : 0,
                                                                                                                                             M = T ? "(0 - " + T + ")" : 0;
            t.each(A, function(t, e) {
              var i = e[0].style;
              if (i.position = "absolute", 2 > t) m ? i.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + n.quirksmodeOffsetHack + ') + "px"') : i.setExpression("height", 'this.parentNode.offsetHeight + "px"'), m ? i.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : i.setExpression("width", 'this.parentNode.offsetWidth + "px"'), M && i.setExpression("left", M), E && i.setExpression("top", E);
              else if (n.centerY) m && i.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), i.marginTop = 0;
              else if (!n.centerY && m) {
                var r = n.css && n.css.top ? parseInt(n.css.top, 10) : 0,
                    s = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + r + ') + "px"';
                i.setExpression("top", s)
              }
            })
          }
          if (v && (n.theme ? x.find(".ui-widget-content").append(v) : x.append(v), (v.jquery || v.nodeType) && t(v).show()), (c || n.forceIframe) && n.showOverlay && b.show(), n.fadeIn) {
            var O = n.onBlock ? n.onBlock : u,
                j = n.showOverlay && !v ? O : u,
                D = v ? O : u;
            n.showOverlay && w._fadeIn(n.fadeIn, j), v && x._fadeIn(n.fadeIn, D)
          } else n.showOverlay && w.show(), v && x.show(), n.onBlock && n.onBlock();
          if (r(1, e, n), m ? (f = x[0], p = t(":input:enabled:visible", f), n.focusInput && setTimeout(o, 20)) : a(x[0], n.centerX, n.centerY), n.timeout) {
            var F = setTimeout(function() {
              m ? t.unblockUI(n) : t(e).unblock(n)
            }, n.timeout);
            t(e).data("blockUI.timeout", F)
          }
        }
      }

      function i(e, i) {
        var s = e == window,
            o = t(e),
            a = o.data("blockUI.history"),
            l = o.data("blockUI.timeout");
        l && (clearTimeout(l), o.removeData("blockUI.timeout")), i = t.extend({}, t.blockUI.defaults, i || {}), r(0, e, i), null === i.onUnblock && (i.onUnblock = o.data("blockUI.onUnblock"), o.removeData("blockUI.onUnblock"));
        var u;
        u = s ? t("body").children().filter(".blockUI").add("body > .blockUI") : o.find(">.blockUI"), i.cursorReset && (u.length > 1 && (u[1].style.cursor = i.cursorReset), u.length > 2 && (u[2].style.cursor = i.cursorReset)), s && (f = p = null), i.fadeOut ? (u.fadeOut(i.fadeOut), setTimeout(function() {
          n(u, a, i, e)
        }, i.fadeOut)) : n(u, a, i, e)
      }

      function n(e, i, n, r) {
        e.each(function() {
          this.parentNode && this.parentNode.removeChild(this)
        }), i && i.el && (i.el.style.display = i.display, i.el.style.position = i.position, i.parent && i.parent.appendChild(i.el), t(r).removeData("blockUI.history")), "function" == typeof n.onUnblock && n.onUnblock(r, n);
        var s = t(document.body),
            o = s.width(),
            a = s[0].style.width;
        s.width(o - 1).width(o), s[0].style.width = a
      }

      function r(e, i, n) {
        var r = i == window,
            o = t(i);
        if ((e || (!r || f) && (r || o.data("blockUI.isBlocked"))) && (o.data("blockUI.isBlocked", e), n.bindEvents && (!e || n.showOverlay))) {
          var a = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
          e ? t(document).bind(a, n, s) : t(document).unbind(a, s)
        }
      }

      function s(e) {
        if (e.keyCode && 9 == e.keyCode && f && e.data.constrainTabKey) {
          var i = p,
              n = !e.shiftKey && e.target === i[i.length - 1],
              r = e.shiftKey && e.target === i[0];
          if (n || r) return setTimeout(function() {
            o(r)
          }, 10), !1
        }
        var s = e.data,
            a = t(e.target);
        return a.hasClass("blockOverlay") && s.onOverlayClick && s.onOverlayClick(), a.parents("div." + s.blockMsgClass).length > 0 ? !0 : 0 === a.parents().children().filter("div.blockUI").length
      }

      function o(t) {
        if (p) {
          var e = p[t === !0 ? p.length - 1 : 0];
          e && e.focus()
        }
      }

      function a(t, e, i) {
        var n = t.parentNode,
            r = t.style,
            s = (n.offsetWidth - t.offsetWidth) / 2 - l(n, "borderLeftWidth"),
            o = (n.offsetHeight - t.offsetHeight) / 2 - l(n, "borderTopWidth");
        e && (r.left = s > 0 ? s + "px" : "0"), i && (r.top = o > 0 ? o + "px" : "0")
      }

      function l(e, i) {
        return parseInt(t.css(e, i), 10) || 0
      }
      if (/^1\.(0|1|2)/.test(t.fn.jquery)) return void alert("blockUI requires jQuery v1.3 or later!  You are using v" + t.fn.jquery);
      t.fn._fadeIn = t.fn.fadeIn;
      var u = t.noop || function() {},
          c = /MSIE/.test(navigator.userAgent),
          h = /MSIE 6.0/.test(navigator.userAgent),
          d = (document.documentMode || 0, t.isFunction(document.createElement("div").style.setExpression));
      t.blockUI = function(t) {
        e(window, t)
      }, t.unblockUI = function(t) {
        i(window, t)
      }, t.growlUI = function(e, i, n, r) {
        var s = t('<div class="growlUI"></div>');
        e && s.append("<h1>" + e + "</h1>"), i && s.append("<h2>" + i + "</h2>"), void 0 === n && (n = 3e3), t.blockUI({
          message: s,
          fadeIn: 700,
          fadeOut: 1e3,
          centerY: !1,
          timeout: n,
          showOverlay: !1,
          onUnblock: r,
          css: t.blockUI.defaults.growlCSS
        })
      }, t.fn.block = function(i) {
        var n = t.extend({}, t.blockUI.defaults, i || {});
        return this.each(function() {
          var e = t(this);
          n.ignoreIfBlocked && e.data("blockUI.isBlocked") || e.unblock({
            fadeOut: 0
          })
        }), this.each(function() {
          "static" == t.css(this, "position") && (this.style.position = "relative"), this.style.zoom = 1, e(this, i)
        })
      }, t.fn.unblock = function(t) {
        return this.each(function() {
          i(this, t)
        })
      }, t.blockUI.version = 2.54, t.blockUI.defaults = {
        message: "<h1>Please wait...</h1>",
        title: null,
        draggable: !0,
        theme: !1,
        css: {
          padding: 0,
          margin: 0,
          width: "30%",
          top: "40%",
          left: "35%",
          textAlign: "center",
          color: "#000",
          border: "3px solid #aaa",
          backgroundColor: "#fff",
          cursor: "wait"
        },
        themedCSS: {
          width: "30%",
          top: "40%",
          left: "35%"
        },
        overlayCSS: {
          backgroundColor: "#000",
          opacity: .6,
          cursor: "wait"
        },
        cursorReset: "default",
        growlCSS: {
          width: "350px",
          top: "10px",
          left: "",
          right: "10px",
          border: "none",
          padding: "5px",
          opacity: .6,
          cursor: "default",
          color: "#fff",
          backgroundColor: "#000",
          "-webkit-border-radius": "10px",
          "-moz-border-radius": "10px",
          "border-radius": "10px"
        },
        iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
        forceIframe: !1,
        baseZ: 1e3,
        centerX: !0,
        centerY: !0,
        allowBodyStretch: !0,
        bindEvents: !0,
        constrainTabKey: !0,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: !0,
        focusInput: !0,
        onBlock: null,
        onUnblock: null,
        onOverlayClick: null,
        quirksmodeOffsetHack: 4,
        blockMsgClass: "blockMsg",
        ignoreIfBlocked: !1
      };
      var f = null,
          p = []
    }
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t(jQuery)
  }(), $(function() {
  $.blockUI.defaults.css.border = "none", $.blockUI.defaults.css.backgroundColor = "transparent", $.blockUI.defaults.message = "", $.extend($.blockUI.defaults.growlCSS, {
    opacity: 1,
    backgroundColor: window.Modernizr && window.Modernizr.rgba ? "rgba(0,0,0,0.8)" : "#000",
    border: "1px solid #3F3F3F"
  })
}),
  function(t, e) {
    var i = "AudioAddict.UI.Spin";
    if (!t.duped(i)) {
      NS(i);
      var n = {
        lines: 18,
        length: 8,
        width: 3,
        radius: 10,
        corners: 0,
        rotate: 0,
        direction: 1,
        color: "rgba(255,255,255,0.5)",
        speed: 1,
        trail: 50,
        shadow: !1,
        hwaccel: !0,
        className: "spinner",
        zIndex: 2,
        top: "auto",
        left: "auto",
        blockUI: {
          overlayCSS: {
            opacity: 0
          }
        }
      };
      AudioAddict.UI.Spin = function(e, i) {
        this.el = e, this.$el = t(e), this.options = i, this.running = !1
      }, AudioAddict.UI.Spin.prototype = {
        start: function() {
          this.running || (this.$el.block(this.options.blockUI), this.spinner = new e.Spinner(this.options), this.spinner.spin(this.el), this.running = !0, t.log(LogPrefix(i) + ": started"))
        },
        stop: function() {
          this.running && (this.$el.unblock(), this.spinner.stop(), this.running = !1, t.log(LogPrefix(i) + ": stopped"))
        },
        getOptions: function() {
          return this.options.slice(0)
        },
        setOptions: function(e) {
          if (e) {
            this.options = t.extend(this.options, e);
            var n = this.running ? !0 : !1;
            this.stop(), n && (t.log(LogPrefix(i) + ": restarting"), this.start())
          }
        }
      }, t.fn.spinner = function(e) {
        var r = e && "string" == typeof e ? e : !1,
            s = r ? !1 : e;
        return this.each(function() {
          var e = t(this),
              o = e.data(i);
          if (o || "stop" !== r) {
            if (!o) {
              var a = t.extend({}, n, e.data("spin"), s);
              o = new AudioAddict.UI.Spin(this, a), e.data(i, o)
            }
            if (s && o.setOptions(s), r) {
              if (!t.isFunction(o[r])) throw "Invalid method name: " + r;
              o[r]()
            } else o.start()
          }
        })
      }
    }
  }(jQuery, this),
  function(t) {
    t.extend(t.fn, {
      exists: function() {
        return this.length > 0
      },
      swapClass: function(t, e) {
        return this.removeClass(t).addClass(e)
      }
    })
  }(this.jQuery),
  function(t, e, i, n) {
    var r, s = NS("AudioAddict.Modules.FB"),
        o = "AudioAddict.WP.UI.Comments",
        a = n("#ui"),
        l = 6e4,
        u = 0,
        c = 0;
    if (!n.duped(o)) {
      var h = function(t) {
            r.params.playerWindow.resizeBy({
              height: t
            })
          },
          d = function() {
            u && (n.log(LogPrefix(o) + ": stopping refresh interval id {%s}", u), window.clearInterval(u), u = null, n(document).off("FB.CommentCreate FB.CommentRemove"))
          },
          f = function(t) {
            d();
            var e = t.data();
            n.log(LogPrefix(o) + ": starting auto-refresh for {%s}", e.href);
            var i = function() {
              p(e, function(i) {
                t.data(n.extend(e, i))
              })
            };
            u = window.setInterval(i, l)
          },
          p = function(t, e) {
            var i = !0;
            n.log(LogPrefix(o) + ": checking if comment refresh needed for: {%s}...", t.href), s.getGraphDataForTrack(t.href, function(r) {
              t = n.extend({}, {
                fbgraph: {
                  commentsbox_count: 0
                }
              }, t);
              try {
                i = t.fbgraph.commentsbox_count !== r.commentsbox_count
              } catch (s) {
                n.log(LogPrefix(o) + ": [ERROR], missing expected graph data", t, r)
              }
              return i === !1 ? void n.log(LogPrefix(o) + ": up to date", r) : (n.log(LogPrefix(o) + ": refreshing comments now", {
                oldCount: t.fbgraph.commentsbox_count,
                newCount: r.commentsbox_count
              }), n("#" + t.guid).find("iframe").attr("src", function(t, e) {
                return e
              }), n.extend(t.fbgraph, r), void("function" == typeof e && e(t)))
            })
          },
          g = function(t, e, i, r) {
            var l = t.data();
            if (t.hasClass("ready"))
              if (t.removeClass("ready"), t.hasClass("closed")) {
                t.swapClass("closed", "expanded"), t.find(".msg").html("Hide Comments"), n.log(LogPrefix(o) + ": loading {%s}", l.href), s.getGraphDataForTrack(l.href, function(e) {
                  t.data("fbgraph", e)
                }), s.embedComments(l.href, e, function(i) {
                  n.log(LogPrefix(o) + ": embed complete for guid {%s}: ", i), e.spinner("stop"), l.guid = i, t.data(l), f(t), t.addClass("ready")
                });
                var u = 0;
                r && (u = 210, h(i));
                var c = function() {
                  a.addClass("animating"), e.slideDown(200, function() {
                    l.guid || e.spinner(), a.removeClass("animating"), n.log(LogPrefix(o) + ": animate open complete")
                  })
                };
                setTimeout(c, u)
              } else t.swapClass("expanded", "closed"), t.find(".msg").html("Show Comments"), n("#ui").addClass("animating"), e.slideUp(200, function() {
                d(), n.log(LogPrefix(o) + ": removing fb comments {#%s}", l.guid), n("#" + l.guid).remove(), t.data({
                  guid: null
                }), r && h(-1 * i), n("#ui").removeClass("animating"), n.log(LogPrefix(o) + ": animate close complete"), t.addClass("ready")
              })
          };
      NS(t).Comments = e.extend({
        NS: t + ".Comments",
        _required: ["playerWindow"],
        init: function(t) {
          this._super(t), r = this, n(document).on({
            "Comments.Toggle": _.debounce(function(t, e) {
              var s = n(e),
                  o = n("#row-comments"),
                  a = r.params.isStandalone;
              s.is(".closed") && (i.Modules.FB.closeComments("#track-history"), a && n("#track-history").not(".collapsed").find(".toggle-state").trigger("click")), g(s, o, 320, a)
            }, 200, !0),
            "TrackHistoryComments.Toggle": function(t, e) {
              var s = n(e).closest(".comment-btn"),
                  o = s.closest(".track"),
                  a = o.find(".fb-comments-wrap"),
                  l = r.params.isStandalone;
              o.toggleClass("active", s.hasClass("closed") && s.hasClass("ready")), s.hasClass("closed") && (i.Modules.FB.closeComments(), n("#comments-toggle.expanded").trigger("click")), g(s, a, 300, l)
            },
            "TrackHistory.Open": function() {
              n("#comments-toggle.expanded").trigger("click")
            },
            "WP.ChannelNavToggle": function() {
              i.Modules.FB.closeComments("#ui")
            },
            "WP.HistoryUpdated": function() {
              d()
            },
            "Track.Changed": function(t, e) {
              var s = n("#comments-toggle");
              if (s.is(".expanded") && s.trigger("click"), r.params.isStandalone && (n("#track-history:not(.collapsed) .header > .content").trigger("click"), n("[data-event='TrackHistoryComments.Toggle'].expanded").trigger("click")), e.track_id > 0) {
                var a = i.Modules.FB.trackCommentUrl(e);
                s.data("href", a).show(), clearInterval(c);
                var u = function() {
                  n.isFunction(i.WP.wp.getState) && "connected" !== i.WP.wp.getState() || i.Modules.FB.getGraphDataForTrack(a, function(t) {
                    n.log(LogPrefix(o) + ": updating comment count (%s)", t.commentsbox_count || 0), s.find(".comment-count").text("(" + (t.commentsbox_count || 0) + ")")
                  })
                };
                c = setInterval(u, l), u()
              } else clearInterval(c), s.hide()
            }
          })
        }
      })
    }
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery),
  function(t, e, i, n) {
    NS(t).Feedback = e.extend({
      NS: t + ".Feedback",
      _required: ["panelId", "buttonId", "submitUrl"],
      init: function(t) {
        this._super(t);
        var e = this,
            r = n(this.params.panelId),
            s = n(this.params.buttonId),
            o = (i.Util, i.WP),
            a = "An error has occured, please try your request again";
        return r.length ? (s.click(function(t) {
          var e = n(this).data("page");
          return window.matchMedia("(max-width: 727px)").matches && e ? (window.location = e, !1) : (r.panel("toggle"), void t.preventDefault())
        }), void r.panel({
          beforeSave: function(t) {
            return n.trim(t["contact[message]"]).length && n.trim(t["contact[email]"]).length ? !0 : (r.panel("error", "Please fill out all fields"), !1)
          },
          save: function(t) {
            var i, s = this;
            this.panel("wait", !0), swfobject ? (i = swfobject.getFlashPlayerVersion(), t.flash = i.major + "." + i.minor + "." + i.release) : t.flash = "Unable to detect flash version", n.log.history && (t.log = n.log.history), o.wp && (t.state = o.wp.getState(), t.access = o.wp.member.getAccess(), t.speed = o.wp.member.getSpeed(), t.volume = o.wp.getVolume(), t.server = o.wp.streamlist.getCurrentStream()), n.ajax({
              type: "POST",
              url: e.params.submitUrl,
              data: t,
              success: function(t) {
                if (s.panel("wait", !1), t.success) s.panel("message", "Thanks", "Thank you for your feedback!", !0), r.find("[name^=contact]").val("");
                else {
                  var e = a;
                  t.errors && t.errors.email && (e = "Please enter a valid email"), s.panel("error", e)
                }
              },
              error: function() {
                s.panel("wait", !1).panel("error", a)
              }
            })
          }
        })) : void this.log("Feedback panel element not found, aborting.")
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery),
  function(t) {
    function e() {
      return {
        empty: !1,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: !1,
        invalidMonth: null,
        invalidFormat: !1,
        userInvalidated: !1,
        iso: !1
      }
    }

    function i(t, e) {
      function i() {
        le.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
      }
      var n = !0;
      return l(function() {
        return n && (i(), n = !1), e.apply(this, arguments)
      }, e)
    }

    function n(t, e) {
      return function(i) {
        return h(t.call(this, i), e)
      }
    }

    function r(t, e) {
      return function(i) {
        return this.lang().ordinal(t.call(this, i), e)
      }
    }

    function s() {}

    function o(t) {
      P(t), l(this, t)
    }

    function a(t) {
      var e = v(t),
          i = e.year || 0,
          n = e.quarter || 0,
          r = e.month || 0,
          s = e.week || 0,
          o = e.day || 0,
          a = e.hour || 0,
          l = e.minute || 0,
          u = e.second || 0,
          c = e.millisecond || 0;
      this._milliseconds = +c + 1e3 * u + 6e4 * l + 36e5 * a, this._days = +o + 7 * s, this._months = +r + 3 * n + 12 * i, this._data = {}, this._bubble()
    }

    function l(t, e) {
      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
      return e.hasOwnProperty("toString") && (t.toString = e.toString), e.hasOwnProperty("valueOf") && (t.valueOf = e.valueOf), t
    }

    function u(t) {
      var e, i = {};
      for (e in t) t.hasOwnProperty(e) && xe.hasOwnProperty(e) && (i[e] = t[e]);
      return i
    }

    function c(t) {
      return 0 > t ? Math.ceil(t) : Math.floor(t)
    }

    function h(t, e, i) {
      for (var n = "" + Math.abs(t), r = t >= 0; n.length < e;) n = "0" + n;
      return (r ? i ? "+" : "" : "-") + n
    }

    function d(t, e, i, n) {
      var r = e._milliseconds,
          s = e._days,
          o = e._months;
      n = null == n ? !0 : n, r && t._d.setTime(+t._d + r * i), s && ne(t, "Date", ie(t, "Date") + s * i), o && ee(t, ie(t, "Month") + o * i), n && le.updateOffset(t, s || o)
    }

    function f(t) {
      return "[object Array]" === Object.prototype.toString.call(t)
    }

    function p(t) {
      return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function g(t, e, i) {
      var n, r = Math.min(t.length, e.length),
          s = Math.abs(t.length - e.length),
          o = 0;
      for (n = 0; r > n; n++)(i && t[n] !== e[n] || !i && _(t[n]) !== _(e[n])) && o++;
      return o + s
    }

    function m(t) {
      if (t) {
        var e = t.toLowerCase().replace(/(.)s$/, "$1");
        t = Je[t] || Ke[e] || e
      }
      return t
    }

    function v(t) {
      var e, i, n = {};
      for (i in t) t.hasOwnProperty(i) && (e = m(i), e && (n[e] = t[i]));
      return n
    }

    function y(e) {
      var i, n;
      if (0 === e.indexOf("week")) i = 7, n = "day";
      else {
        if (0 !== e.indexOf("month")) return;
        i = 12, n = "month"
      }
      le[e] = function(r, s) {
        var o, a, l = le.fn._lang[e],
            u = [];
        if ("number" == typeof r && (s = r, r = t), a = function(t) {
          var e = le().utc().set(n, t);
          return l.call(le.fn._lang, e, r || "")
        }, null != s) return a(s);
        for (o = 0; i > o; o++) u.push(a(o));
        return u
      }
    }

    function _(t) {
      var e = +t,
          i = 0;
      return 0 !== e && isFinite(e) && (i = e >= 0 ? Math.floor(e) : Math.ceil(e)), i
    }

    function b(t, e) {
      return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
    }

    function w(t, e, i) {
      return K(le([t, 11, 31 + e - i]), e, i).week
    }

    function x(t) {
      return k(t) ? 366 : 365
    }

    function k(t) {
      return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
    }

    function P(t) {
      var e;
      t._a && -2 === t._pf.overflow && (e = t._a[ge] < 0 || t._a[ge] > 11 ? ge : t._a[me] < 1 || t._a[me] > b(t._a[pe], t._a[ge]) ? me : t._a[ve] < 0 || t._a[ve] > 23 ? ve : t._a[ye] < 0 || t._a[ye] > 59 ? ye : t._a[_e] < 0 || t._a[_e] > 59 ? _e : t._a[be] < 0 || t._a[be] > 999 ? be : -1, t._pf._overflowDayOfYear && (pe > e || e > me) && (e = me), t._pf.overflow = e)
    }

    function A(t) {
      return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length)), t._isValid
    }

    function C(t) {
      return t ? t.toLowerCase().replace("_", "-") : t
    }

    function S(t, e) {
      return e._isUTC ? le(t).zone(e._offset || 0) : le(t).local()
    }

    function I(t, e) {
      return e.abbr = t, we[t] || (we[t] = new s), we[t].set(e), we[t]
    }

    function T(t) {
      delete we[t]
    }

    function E(t) {
      var e, i, n, r, s = 0,
          o = function(t) {
            if (!we[t] && ke) try {
              require("./lang/" + t)
            } catch (e) {}
            return we[t]
          };
      if (!t) return le.fn._lang;
      if (!f(t)) {
        if (i = o(t)) return i;
        t = [t]
      }
      for (; s < t.length;) {
        for (r = C(t[s]).split("-"), e = r.length, n = C(t[s + 1]), n = n ? n.split("-") : null; e > 0;) {
          if (i = o(r.slice(0, e).join("-"))) return i;
          if (n && n.length >= e && g(r, n, !0) >= e - 1) break;
          e--
        }
        s++
      }
      return le.fn._lang
    }

    function M(t) {
      return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }

    function O(t) {
      var e, i, n = t.match(Se);
      for (e = 0, i = n.length; i > e; e++) n[e] = ii[n[e]] ? ii[n[e]] : M(n[e]);
      return function(r) {
        var s = "";
        for (e = 0; i > e; e++) s += n[e] instanceof Function ? n[e].call(r, t) : n[e];
        return s
      }
    }

    function j(t, e) {
      return t.isValid() ? (e = D(e, t.lang()), Ze[e] || (Ze[e] = O(e)), Ze[e](t)) : t.lang().invalidDate()
    }

    function D(t, e) {
      function i(t) {
        return e.longDateFormat(t) || t
      }
      var n = 5;
      for (Ie.lastIndex = 0; n >= 0 && Ie.test(t);) t = t.replace(Ie, i), Ie.lastIndex = 0, n -= 1;
      return t
    }

    function F(t, e) {
      var i, n = e._strict;
      switch (t) {
        case "Q":
          return $e;
        case "DDDD":
          return We;
        case "YYYY":
        case "GGGG":
        case "gggg":
          return n ? ze : Me;
        case "Y":
        case "G":
        case "g":
          return Be;
        case "YYYYYY":
        case "YYYYY":
        case "GGGGG":
        case "ggggg":
          return n ? Ue : Oe;
        case "S":
          if (n) return $e;
        case "SS":
          if (n) return Re;
        case "SSS":
          if (n) return We;
        case "DDD":
          return Ee;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
          return De;
        case "a":
        case "A":
          return E(e._l)._meridiemParse;
        case "X":
          return Le;
        case "Z":
        case "ZZ":
          return Fe;
        case "T":
          return Ne;
        case "SSSS":
          return je;
        case "MM":
        case "DD":
        case "YY":
        case "GG":
        case "gg":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "ww":
        case "WW":
          return n ? Re : Te;
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
        case "w":
        case "W":
        case "e":
        case "E":
          return Te;
        case "Do":
          return He;
        default:
          return i = new RegExp(U(z(t.replace("\\", "")), "i"))
      }
    }

    function N(t) {
      t = t || "";
      var e = t.match(Fe) || [],
          i = e[e.length - 1] || [],
          n = (i + "").match(Xe) || ["-", 0, 0],
          r = +(60 * n[1]) + _(n[2]);
      return "+" === n[0] ? -r : r
    }

    function L(t, e, i) {
      var n, r = i._a;
      switch (t) {
        case "Q":
          null != e && (r[ge] = 3 * (_(e) - 1));
          break;
        case "M":
        case "MM":
          null != e && (r[ge] = _(e) - 1);
          break;
        case "MMM":
        case "MMMM":
          n = E(i._l).monthsParse(e), null != n ? r[ge] = n : i._pf.invalidMonth = e;
          break;
        case "D":
        case "DD":
          null != e && (r[me] = _(e));
          break;
        case "Do":
          null != e && (r[me] = _(parseInt(e, 10)));
          break;
        case "DDD":
        case "DDDD":
          null != e && (i._dayOfYear = _(e));
          break;
        case "YY":
          r[pe] = le.parseTwoDigitYear(e);
          break;
        case "YYYY":
        case "YYYYY":
        case "YYYYYY":
          r[pe] = _(e);
          break;
        case "a":
        case "A":
          i._isPm = E(i._l).isPM(e);
          break;
        case "H":
        case "HH":
        case "h":
        case "hh":
          r[ve] = _(e);
          break;
        case "m":
        case "mm":
          r[ye] = _(e);
          break;
        case "s":
        case "ss":
          r[_e] = _(e);
          break;
        case "S":
        case "SS":
        case "SSS":
        case "SSSS":
          r[be] = _(1e3 * ("0." + e));
          break;
        case "X":
          i._d = new Date(1e3 * parseFloat(e));
          break;
        case "Z":
        case "ZZ":
          i._useUTC = !0, i._tzm = N(e);
          break;
        case "w":
        case "ww":
        case "W":
        case "WW":
        case "d":
        case "dd":
        case "ddd":
        case "dddd":
        case "e":
        case "E":
          t = t.substr(0, 1);
        case "gg":
        case "gggg":
        case "GG":
        case "GGGG":
        case "GGGGG":
          t = t.substr(0, 2), e && (i._w = i._w || {}, i._w[t] = e)
      }
    }

    function H(t) {
      var e, i, n, r, s, o, a, l, u, c, h = [];
      if (!t._d) {
        for (n = R(t), t._w && null == t._a[me] && null == t._a[ge] && (s = function(e) {
          var i = parseInt(e, 10);
          return e ? e.length < 3 ? i > 68 ? 1900 + i : 2e3 + i : i : null == t._a[pe] ? le().weekYear() : t._a[pe]
        }, o = t._w, null != o.GG || null != o.W || null != o.E ? a = Z(s(o.GG), o.W || 1, o.E, 4, 1) : (l = E(t._l), u = null != o.d ? X(o.d, l) : null != o.e ? parseInt(o.e, 10) + l._week.dow : 0, c = parseInt(o.w, 10) || 1, null != o.d && u < l._week.dow && c++, a = Z(s(o.gg), c, u, l._week.doy, l._week.dow)), t._a[pe] = a.year, t._dayOfYear = a.dayOfYear), t._dayOfYear && (r = null == t._a[pe] ? n[pe] : t._a[pe], t._dayOfYear > x(r) && (t._pf._overflowDayOfYear = !0), i = G(r, 0, t._dayOfYear), t._a[ge] = i.getUTCMonth(), t._a[me] = i.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = h[e] = n[e];
        for (; 7 > e; e++) t._a[e] = h[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
        h[ve] += _((t._tzm || 0) / 60), h[ye] += _((t._tzm || 0) % 60), t._d = (t._useUTC ? G : Y).apply(null, h)
      }
    }

    function $(t) {
      var e;
      t._d || (e = v(t._i), t._a = [e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond], H(t))
    }

    function R(t) {
      var e = new Date;
      return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
    }

    function W(t) {
      t._a = [], t._pf.empty = !0;
      var e, i, n, r, s, o = E(t._l),
          a = "" + t._i,
          l = a.length,
          u = 0;
      for (n = D(t._f, o).match(Se) || [], e = 0; e < n.length; e++) r = n[e], i = (a.match(F(r, t)) || [])[0], i && (s = a.substr(0, a.indexOf(i)), s.length > 0 && t._pf.unusedInput.push(s), a = a.slice(a.indexOf(i) + i.length), u += i.length), ii[r] ? (i ? t._pf.empty = !1 : t._pf.unusedTokens.push(r), L(r, i, t)) : t._strict && !i && t._pf.unusedTokens.push(r);
      t._pf.charsLeftOver = l - u, a.length > 0 && t._pf.unusedInput.push(a), t._isPm && t._a[ve] < 12 && (t._a[ve] += 12), t._isPm === !1 && 12 === t._a[ve] && (t._a[ve] = 0), H(t), P(t)
    }

    function z(t) {
      return t.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, i, n, r) {
        return e || i || n || r
      })
    }

    function U(t) {
      return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function B(t) {
      var i, n, r, s, o;
      if (0 === t._f.length) return t._pf.invalidFormat = !0, void(t._d = new Date(0 / 0));
      for (s = 0; s < t._f.length; s++) o = 0, i = l({}, t), i._pf = e(), i._f = t._f[s], W(i), A(i) && (o += i._pf.charsLeftOver, o += 10 * i._pf.unusedTokens.length, i._pf.score = o, (null == r || r > o) && (r = o, n = i));
      l(t, n || i)
    }

    function q(t) {
      var e, i, n = t._i,
          r = qe.exec(n);
      if (r) {
        for (t._pf.iso = !0, e = 0, i = Ye.length; i > e; e++)
          if (Ye[e][1].exec(n)) {
            t._f = Ye[e][0] + (r[6] || " ");
            break
          }
        for (e = 0, i = Ge.length; i > e; e++)
          if (Ge[e][1].exec(n)) {
            t._f += Ge[e][0];
            break
          }
        n.match(Fe) && (t._f += "Z"), W(t)
      } else le.createFromInputFallback(t)
    }

    function V(e) {
      var i = e._i,
          n = Pe.exec(i);
      i === t ? e._d = new Date : n ? e._d = new Date(+n[1]) : "string" == typeof i ? q(e) : f(i) ? (e._a = i.slice(0), H(e)) : p(i) ? e._d = new Date(+i) : "object" == typeof i ? $(e) : "number" == typeof i ? e._d = new Date(i) : le.createFromInputFallback(e)
    }

    function Y(t, e, i, n, r, s, o) {
      var a = new Date(t, e, i, n, r, s, o);
      return 1970 > t && a.setFullYear(t), a
    }

    function G(t) {
      var e = new Date(Date.UTC.apply(null, arguments));
      return 1970 > t && e.setUTCFullYear(t), e
    }

    function X(t, e) {
      if ("string" == typeof t)
        if (isNaN(t)) {
          if (t = e.weekdaysParse(t), "number" != typeof t) return null
        } else t = parseInt(t, 10);
      return t
    }

    function Q(t, e, i, n, r) {
      return r.relativeTime(e || 1, !!i, t, n)
    }

    function J(t, e, i) {
      var n = fe(Math.abs(t) / 1e3),
          r = fe(n / 60),
          s = fe(r / 60),
          o = fe(s / 24),
          a = fe(o / 365),
          l = 45 > n && ["s", n] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === s && ["h"] || 22 > s && ["hh", s] || 1 === o && ["d"] || 25 >= o && ["dd", o] || 45 >= o && ["M"] || 345 > o && ["MM", fe(o / 30)] || 1 === a && ["y"] || ["yy", a];
      return l[2] = e, l[3] = t > 0, l[4] = i, Q.apply({}, l)
    }

    function K(t, e, i) {
      var n, r = i - e,
          s = i - t.day();
      return s > r && (s -= 7), r - 7 > s && (s += 7), n = le(t).add("d", s), {
        week: Math.ceil(n.dayOfYear() / 7),
        year: n.year()
      }
    }

    function Z(t, e, i, n, r) {
      var s, o, a = G(t, 0, 1).getUTCDay();
      return i = null != i ? i : r, s = r - a + (a > n ? 7 : 0) - (r > a ? 7 : 0), o = 7 * (e - 1) + (i - r) + s + 1, {
        year: o > 0 ? t : t - 1,
        dayOfYear: o > 0 ? o : x(t - 1) + o
      }
    }

    function te(e) {
      var i = e._i,
          n = e._f;
      return null === i || n === t && "" === i ? le.invalid({
        nullInput: !0
      }) : ("string" == typeof i && (e._i = i = E().preparse(i)), le.isMoment(i) ? (e = u(i), e._d = new Date(+i._d)) : n ? f(n) ? B(e) : W(e) : V(e), new o(e))
    }

    function ee(t, e) {
      var i;
      return "string" == typeof e && (e = t.lang().monthsParse(e), "number" != typeof e) ? t : (i = Math.min(t.date(), b(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t)
    }

    function ie(t, e) {
      return t._d["get" + (t._isUTC ? "UTC" : "") + e]()
    }

    function ne(t, e, i) {
      return "Month" === e ? ee(t, i) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
    }

    function re(t, e) {
      return function(i) {
        return null != i ? (ne(this, t, i), le.updateOffset(this, e), this) : ie(this, t)
      }
    }

    function se(t) {
      le.duration.fn[t] = function() {
        return this._data[t]
      }
    }

    function oe(t, e) {
      le.duration.fn["as" + t] = function() {
        return +this / e
      }
    }

    function ae(t) {
      "undefined" == typeof ender && (ue = de.moment, de.moment = t ? i("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", le) : le)
    }
    for (var le, ue, ce, he = "2.6.0", de = "undefined" != typeof global ? global : this, fe = Math.round, pe = 0, ge = 1, me = 2, ve = 3, ye = 4, _e = 5, be = 6, we = {}, xe = {
      _isAMomentObject: null,
      _i: null,
      _f: null,
      _l: null,
      _strict: null,
      _isUTC: null,
      _offset: null,
      _pf: null,
      _lang: null
    }, ke = "undefined" != typeof module && module.exports, Pe = /^\/?Date\((\-?\d+)/i, Ae = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ce = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Se = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Ie = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Te = /\d\d?/, Ee = /\d{1,3}/, Me = /\d{1,4}/, Oe = /[+\-]?\d{1,6}/, je = /\d+/, De = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Fe = /Z|[\+\-]\d\d:?\d\d/gi, Ne = /T/i, Le = /[\+\-]?\d+(\.\d{1,3})?/, He = /\d{1,2}/, $e = /\d/, Re = /\d\d/, We = /\d{3}/, ze = /\d{4}/, Ue = /[+-]?\d{6}/, Be = /[+-]?\d+/, qe = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ve = "YYYY-MM-DDTHH:mm:ssZ", Ye = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
      ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
      ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d{2}/],
      ["YYYY-DDD", /\d{4}-\d{3}/]
    ], Ge = [
      ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
      ["HH:mm", /(T| )\d\d:\d\d/],
      ["HH", /(T| )\d\d/]
    ], Xe = /([\+\-]|\d\d)/gi, Qe = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
      Milliseconds: 1,
      Seconds: 1e3,
      Minutes: 6e4,
      Hours: 36e5,
      Days: 864e5,
      Months: 2592e6,
      Years: 31536e6
    }), Je = {
      ms: "millisecond",
      s: "second",
      m: "minute",
      h: "hour",
      d: "day",
      D: "date",
      w: "week",
      W: "isoWeek",
      M: "month",
      Q: "quarter",
      y: "year",
      DDD: "dayOfYear",
      e: "weekday",
      E: "isoWeekday",
      gg: "weekYear",
      GG: "isoWeekYear"
    }, Ke = {
      dayofyear: "dayOfYear",
      isoweekday: "isoWeekday",
      isoweek: "isoWeek",
      weekyear: "weekYear",
      isoweekyear: "isoWeekYear"
    }, Ze = {}, ti = "DDD w W M D d".split(" "), ei = "M D H h m s w W".split(" "), ii = {
      M: function() {
        return this.month() + 1
      },
      MMM: function(t) {
        return this.lang().monthsShort(this, t)
      },
      MMMM: function(t) {
        return this.lang().months(this, t)
      },
      D: function() {
        return this.date()
      },
      DDD: function() {
        return this.dayOfYear()
      },
      d: function() {
        return this.day()
      },
      dd: function(t) {
        return this.lang().weekdaysMin(this, t)
      },
      ddd: function(t) {
        return this.lang().weekdaysShort(this, t)
      },
      dddd: function(t) {
        return this.lang().weekdays(this, t)
      },
      w: function() {
        return this.week()
      },
      W: function() {
        return this.isoWeek()
      },
      YY: function() {
        return h(this.year() % 100, 2)
      },
      YYYY: function() {
        return h(this.year(), 4)
      },
      YYYYY: function() {
        return h(this.year(), 5)
      },
      YYYYYY: function() {
        var t = this.year(),
            e = t >= 0 ? "+" : "-";
        return e + h(Math.abs(t), 6)
      },
      gg: function() {
        return h(this.weekYear() % 100, 2)
      },
      gggg: function() {
        return h(this.weekYear(), 4)
      },
      ggggg: function() {
        return h(this.weekYear(), 5)
      },
      GG: function() {
        return h(this.isoWeekYear() % 100, 2)
      },
      GGGG: function() {
        return h(this.isoWeekYear(), 4)
      },
      GGGGG: function() {
        return h(this.isoWeekYear(), 5)
      },
      e: function() {
        return this.weekday()
      },
      E: function() {
        return this.isoWeekday()
      },
      a: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
      },
      A: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
      },
      H: function() {
        return this.hours()
      },
      h: function() {
        return this.hours() % 12 || 12
      },
      m: function() {
        return this.minutes()
      },
      s: function() {
        return this.seconds()
      },
      S: function() {
        return _(this.milliseconds() / 100)
      },
      SS: function() {
        return h(_(this.milliseconds() / 10), 2)
      },
      SSS: function() {
        return h(this.milliseconds(), 3)
      },
      SSSS: function() {
        return h(this.milliseconds(), 3)
      },
      Z: function() {
        var t = -this.zone(),
            e = "+";
        return 0 > t && (t = -t, e = "-"), e + h(_(t / 60), 2) + ":" + h(_(t) % 60, 2)
      },
      ZZ: function() {
        var t = -this.zone(),
            e = "+";
        return 0 > t && (t = -t, e = "-"), e + h(_(t / 60), 2) + h(_(t) % 60, 2)
      },
      z: function() {
        return this.zoneAbbr()
      },
      zz: function() {
        return this.zoneName()
      },
      X: function() {
        return this.unix()
      },
      Q: function() {
        return this.quarter()
      }
    }, ni = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; ti.length;) ce = ti.pop(), ii[ce + "o"] = r(ii[ce], ce);
    for (; ei.length;) ce = ei.pop(), ii[ce + ce] = n(ii[ce], 2);
    for (ii.DDDD = n(ii.DDD, 3), l(s.prototype, {
      set: function(t) {
        var e, i;
        for (i in t) e = t[i], "function" == typeof e ? this[i] = e : this["_" + i] = e
      },
      _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      months: function(t) {
        return this._months[t.month()]
      },
      _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      monthsShort: function(t) {
        return this._monthsShort[t.month()]
      },
      monthsParse: function(t) {
        var e, i, n;
        for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
          if (this._monthsParse[e] || (i = le.utc([2e3, e]), n = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[e] = new RegExp(n.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
      },
      _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      weekdays: function(t) {
        return this._weekdays[t.day()]
      },
      _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      weekdaysShort: function(t) {
        return this._weekdaysShort[t.day()]
      },
      _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      weekdaysMin: function(t) {
        return this._weekdaysMin[t.day()]
      },
      weekdaysParse: function(t) {
        var e, i, n;
        for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
          if (this._weekdaysParse[e] || (i = le([2e3, 1]).day(e), n = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[e] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
      },
      _longDateFormat: {
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D YYYY",
        LLL: "MMMM D YYYY LT",
        LLLL: "dddd, MMMM D YYYY LT"
      },
      longDateFormat: function(t) {
        var e = this._longDateFormat[t];
        return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
          return t.slice(1)
        }), this._longDateFormat[t] = e), e
      },
      isPM: function(t) {
        return "p" === (t + "").toLowerCase().charAt(0)
      },
      _meridiemParse: /[ap]\.?m?\.?/i,
      meridiem: function(t, e, i) {
        return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
      },
      _calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      },
      calendar: function(t, e) {
        var i = this._calendar[t];
        return "function" == typeof i ? i.apply(e) : i
      },
      _relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      relativeTime: function(t, e, i, n) {
        var r = this._relativeTime[i];
        return "function" == typeof r ? r(t, e, i, n) : r.replace(/%d/i, t)
      },
      pastFuture: function(t, e) {
        var i = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof i ? i(e) : i.replace(/%s/i, e)
      },
      ordinal: function(t) {
        return this._ordinal.replace("%d", t)
      },
      _ordinal: "%d",
      preparse: function(t) {
        return t
      },
      postformat: function(t) {
        return t
      },
      week: function(t) {
        return K(t, this._week.dow, this._week.doy).week
      },
      _week: {
        dow: 0,
        doy: 6
      },
      _invalidDate: "Invalid date",
      invalidDate: function() {
        return this._invalidDate
      }
    }), le = function(i, n, r, s) {
      var o;
      return "boolean" == typeof r && (s = r, r = t), o = {}, o._isAMomentObject = !0, o._i = i, o._f = n, o._l = r, o._strict = s, o._isUTC = !1, o._pf = e(), te(o)
    }, le.suppressDeprecationWarnings = !1, le.createFromInputFallback = i("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
      t._d = new Date(t._i)
    }), le.utc = function(i, n, r, s) {
      var o;
      return "boolean" == typeof r && (s = r, r = t), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = r, o._i = i, o._f = n, o._strict = s, o._pf = e(), te(o).utc()
    }, le.unix = function(t) {
      return le(1e3 * t)
    }, le.duration = function(t, e) {
      var i, n, r, s = t,
          o = null;
      return le.isDuration(t) ? s = {
        ms: t._milliseconds,
        d: t._days,
        M: t._months
      } : "number" == typeof t ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (o = Ae.exec(t)) ? (i = "-" === o[1] ? -1 : 1, s = {
        y: 0,
        d: _(o[me]) * i,
        h: _(o[ve]) * i,
        m: _(o[ye]) * i,
        s: _(o[_e]) * i,
        ms: _(o[be]) * i
      }) : (o = Ce.exec(t)) && (i = "-" === o[1] ? -1 : 1, r = function(t) {
        var e = t && parseFloat(t.replace(",", "."));
        return (isNaN(e) ? 0 : e) * i
      }, s = {
        y: r(o[2]),
        M: r(o[3]),
        d: r(o[4]),
        h: r(o[5]),
        m: r(o[6]),
        s: r(o[7]),
        w: r(o[8])
      }), n = new a(s), le.isDuration(t) && t.hasOwnProperty("_lang") && (n._lang = t._lang), n
    }, le.version = he, le.defaultFormat = Ve, le.momentProperties = xe, le.updateOffset = function() {}, le.lang = function(t, e) {
      var i;
      return t ? (e ? I(C(t), e) : null === e ? (T(t), t = "en") : we[t] || E(t), i = le.duration.fn._lang = le.fn._lang = E(t), i._abbr) : le.fn._lang._abbr
    }, le.langData = function(t) {
      return t && t._lang && t._lang._abbr && (t = t._lang._abbr), E(t)
    }, le.isMoment = function(t) {
      return t instanceof o || null != t && t.hasOwnProperty("_isAMomentObject")
    }, le.isDuration = function(t) {
      return t instanceof a
    }, ce = ni.length - 1; ce >= 0; --ce) y(ni[ce]);
    le.normalizeUnits = function(t) {
      return m(t)
    }, le.invalid = function(t) {
      var e = le.utc(0 / 0);
      return null != t ? l(e._pf, t) : e._pf.userInvalidated = !0, e
    }, le.parseZone = function() {
      return le.apply(null, arguments).parseZone()
    }, le.parseTwoDigitYear = function(t) {
      return _(t) + (_(t) > 68 ? 1900 : 2e3)
    }, l(le.fn = o.prototype, {
      clone: function() {
        return le(this)
      },
      valueOf: function() {
        return +this._d + 6e4 * (this._offset || 0)
      },
      unix: function() {
        return Math.floor(+this / 1e3)
      },
      toString: function() {
        return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
      },
      toDate: function() {
        return this._offset ? new Date(+this) : this._d
      },
      toISOString: function() {
        var t = le(this).utc();
        return 0 < t.year() && t.year() <= 9999 ? j(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : j(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
      },
      toArray: function() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
      },
      isValid: function() {
        return A(this)
      },
      isDSTShifted: function() {
        return this._a ? this.isValid() && g(this._a, (this._isUTC ? le.utc(this._a) : le(this._a)).toArray()) > 0 : !1
      },
      parsingFlags: function() {
        return l({}, this._pf)
      },
      invalidAt: function() {
        return this._pf.overflow
      },
      utc: function() {
        return this.zone(0)
      },
      local: function() {
        return this.zone(0), this._isUTC = !1, this
      },
      format: function(t) {
        var e = j(this, t || le.defaultFormat);
        return this.lang().postformat(e)
      },
      add: function(t, e) {
        var i;
        return i = "string" == typeof t ? le.duration(+e, t) : le.duration(t, e), d(this, i, 1), this
      },
      subtract: function(t, e) {
        var i;
        return i = "string" == typeof t ? le.duration(+e, t) : le.duration(t, e), d(this, i, -1), this
      },
      diff: function(t, e, i) {
        var n, r, s = S(t, this),
            o = 6e4 * (this.zone() - s.zone());
        return e = m(e), "year" === e || "month" === e ? (n = 432e5 * (this.daysInMonth() + s.daysInMonth()), r = 12 * (this.year() - s.year()) + (this.month() - s.month()), r += (this - le(this).startOf("month") - (s - le(s).startOf("month"))) / n, r -= 6e4 * (this.zone() - le(this).startOf("month").zone() - (s.zone() - le(s).startOf("month").zone())) / n, "year" === e && (r /= 12)) : (n = this - s, r = "second" === e ? n / 1e3 : "minute" === e ? n / 6e4 : "hour" === e ? n / 36e5 : "day" === e ? (n - o) / 864e5 : "week" === e ? (n - o) / 6048e5 : n), i ? r : c(r)
      },
      from: function(t, e) {
        return le.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
      },
      fromNow: function(t) {
        return this.from(le(), t)
      },
      calendar: function() {
        var t = S(le(), this).startOf("day"),
            e = this.diff(t, "days", !0),
            i = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(i, this))
      },
      isLeapYear: function() {
        return k(this.year())
      },
      isDST: function() {
        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
      },
      day: function(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = X(t, this.lang()), this.add({
          d: t - e
        })) : e
      },
      month: re("Month", !0),
      startOf: function(t) {
        switch (t = m(t)) {
          case "year":
            this.month(0);
          case "quarter":
          case "month":
            this.date(1);
          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);
          case "hour":
            this.minutes(0);
          case "minute":
            this.seconds(0);
          case "second":
            this.milliseconds(0)
        }
        return "week" === t ? this.weekday(0) : "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
      },
      endOf: function(t) {
        return t = m(t), this.startOf(t).add("isoWeek" === t ? "week" : t, 1).subtract("ms", 1)
      },
      isAfter: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) > +le(t).startOf(e)
      },
      isBefore: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) < +le(t).startOf(e)
      },
      isSame: function(t, e) {
        return e = e || "ms", +this.clone().startOf(e) === +S(t, this).startOf(e)
      },
      min: function(t) {
        return t = le.apply(null, arguments), this > t ? this : t
      },
      max: function(t) {
        return t = le.apply(null, arguments), t > this ? this : t
      },
      zone: function(t, e) {
        var i = this._offset || 0;
        return null == t ? this._isUTC ? i : this._d.getTimezoneOffset() : ("string" == typeof t && (t = N(t)), Math.abs(t) < 16 && (t = 60 * t), this._offset = t, this._isUTC = !0, i !== t && (!e || this._changeInProgress ? d(this, le.duration(i - t, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, le.updateOffset(this, !0), this._changeInProgress = null)), this)
      },
      zoneAbbr: function() {
        return this._isUTC ? "UTC" : ""
      },
      zoneName: function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
      },
      parseZone: function() {
        return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
      },
      hasAlignedHourOffset: function(t) {
        return t = t ? le(t).zone() : 0, (this.zone() - t) % 60 === 0
      },
      daysInMonth: function() {
        return b(this.year(), this.month())
      },
      dayOfYear: function(t) {
        var e = fe((le(this).startOf("day") - le(this).startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add("d", t - e)
      },
      quarter: function(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
      },
      weekYear: function(t) {
        var e = K(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == t ? e : this.add("y", t - e)
      },
      isoWeekYear: function(t) {
        var e = K(this, 1, 4).year;
        return null == t ? e : this.add("y", t - e)
      },
      week: function(t) {
        var e = this.lang().week(this);
        return null == t ? e : this.add("d", 7 * (t - e))
      },
      isoWeek: function(t) {
        var e = K(this, 1, 4).week;
        return null == t ? e : this.add("d", 7 * (t - e))
      },
      weekday: function(t) {
        var e = (this.day() + 7 - this.lang()._week.dow) % 7;
        return null == t ? e : this.add("d", t - e)
      },
      isoWeekday: function(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
      },
      isoWeeksInYear: function() {
        return w(this.year(), 1, 4)
      },
      weeksInYear: function() {
        var t = this._lang._week;
        return w(this.year(), t.dow, t.doy)
      },
      get: function(t) {
        return t = m(t), this[t]()
      },
      set: function(t, e) {
        return t = m(t), "function" == typeof this[t] && this[t](e), this
      },
      lang: function(e) {
        return e === t ? this._lang : (this._lang = E(e), this)
      }
    }), le.fn.millisecond = le.fn.milliseconds = re("Milliseconds", !1), le.fn.second = le.fn.seconds = re("Seconds", !1), le.fn.minute = le.fn.minutes = re("Minutes", !1), le.fn.hour = le.fn.hours = re("Hours", !0), le.fn.date = re("Date", !0), le.fn.dates = i("dates accessor is deprecated. Use date instead.", re("Date", !0)), le.fn.year = re("FullYear", !0), le.fn.years = i("years accessor is deprecated. Use year instead.", re("FullYear", !0)), le.fn.days = le.fn.day, le.fn.months = le.fn.month, le.fn.weeks = le.fn.week, le.fn.isoWeeks = le.fn.isoWeek, le.fn.quarters = le.fn.quarter, le.fn.toJSON = le.fn.toISOString, l(le.duration.fn = a.prototype, {
      _bubble: function() {
        var t, e, i, n, r = this._milliseconds,
            s = this._days,
            o = this._months,
            a = this._data;
        a.milliseconds = r % 1e3, t = c(r / 1e3), a.seconds = t % 60, e = c(t / 60), a.minutes = e % 60, i = c(e / 60), a.hours = i % 24, s += c(i / 24), a.days = s % 30, o += c(s / 30), a.months = o % 12, n = c(o / 12), a.years = n
      },
      weeks: function() {
        return c(this.days() / 7)
      },
      valueOf: function() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * _(this._months / 12)
      },
      humanize: function(t) {
        var e = +this,
            i = J(e, !t, this.lang());
        return t && (i = this.lang().pastFuture(e, i)), this.lang().postformat(i)
      },
      add: function(t, e) {
        var i = le.duration(t, e);
        return this._milliseconds += i._milliseconds, this._days += i._days, this._months += i._months, this._bubble(), this
      },
      subtract: function(t, e) {
        var i = le.duration(t, e);
        return this._milliseconds -= i._milliseconds, this._days -= i._days, this._months -= i._months, this._bubble(), this
      },
      get: function(t) {
        return t = m(t), this[t.toLowerCase() + "s"]()
      },
      as: function(t) {
        return t = m(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
      },
      lang: le.fn.lang,
      toIsoString: function() {
        var t = Math.abs(this.years()),
            e = Math.abs(this.months()),
            i = Math.abs(this.days()),
            n = Math.abs(this.hours()),
            r = Math.abs(this.minutes()),
            s = Math.abs(this.seconds() + this.milliseconds() / 1e3);
        return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (i ? i + "D" : "") + (n || r || s ? "T" : "") + (n ? n + "H" : "") + (r ? r + "M" : "") + (s ? s + "S" : "") : "P0D"
      }
    });
    for (ce in Qe) Qe.hasOwnProperty(ce) && (oe(ce, Qe[ce]), se(ce.toLowerCase()));
    oe("Weeks", 6048e5), le.duration.fn.asMonths = function() {
      return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, le.lang("en", {
      ordinal: function(t) {
        var e = t % 10,
            i = 1 === _(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
        return t + i
      }
    }), ke ? module.exports = le : "function" == typeof define && define.amd ? (define("moment", function(t, e, i) {
      return i.config && i.config() && i.config().noGlobal === !0 && (de.moment = ue), le
    }), ae(!0)) : ae()
  }.call(this),
  function(t, e, i, n) {
    function r() {
      if (!h) {
        var t = getUnixTimestamp();
        c.find("[data-ended]").each(function() {
          var e = parseFloat(n(this).data("ended"));
          e > 0 && t > e ? n(this).text(moment.unix(e).fromNow()) : n(this).empty()
        })
      }
    }

    function s(t) {
      var e, r, s = "",
          o = [],
          a = getUnixTimestamp();
      for (r = 0; r < t.length; r++) {
        if (e = n.extend({}, t[r]), o[r] = e, "advertisement" === e.type) try {
          e.url = e.url || e.ad.url
        } catch (u) {}
        e.ended && (e.ended > a && (e.ended = a - 1), e.endsText = moment.unix(e.ended).fromNow()), e.oddEvenClass = (r + 1) % 2 === 0 ? "even" : "odd"
      }
      for (r = 0; r < o.length; r++) s += i.UI.Templates.render(l.params.templateId, {
        track: o[r]
      });
      return s
    }

    function o(t) {
      for (var e = [], i = 0, n = Math.min(t.length, l.params.maxItems), r = 0; e.length < n && r < t.length;)("advertisement" !== t[r].type || i < l.params.maxAdItems) && ("advertisement" === t[r].type && (i += 1), e.push(t[r])), r += 1;
      return e
    }

    function a(t, e) {
      h = !0, u.closest(".hidden").length > 0 && u.hide().closest(".hidden").removeClass("hidden"), c.html(s(o(e))), u.is(":hidden") && u.slideDown(), n(document).trigger("WP.HistoryUpdated", [c]), h = !1
    }
    var l, u, c, h = !1,
        d = {
          maxAdItems: 2
        };
    NS(t).History = e.extend({
      NS: t + ".History",
      _required: ["playerWindow", "historyId", "templateId", "maxItems"],
      init: function(t) {
        this._super(n.extend(d, t)), l = this, u = n(this.params.historyId), c = u.find(".items"), n("html").hasClass("lt-ie9") && c.on("hover", ".item", function(t) {
          n(this).toggleClass("hover", "mouseenter" === t.type)
        });
        var e = u.find(".label"),
            s = u.find(".arrow"),
            o = u.find(".wrapper"),
            h = o.find(".stage"),
            f = o.outerHeight();
        o.hide(), n(document).on("metadata-history-update", a).on("WP.ToggleTrackHistory", _.debounce(function() {
          if (!u.hasClass("animating"))
            if (u.hasClass("collapsed")) u.addClass("animating"), l.params.playerWindow.resizeBy({
              height: f
            }), o.show(), e.text("Hide Recently Played"), h.slideDown(200, function() {
              u.removeClass("collapsed animating"), s.swapClass("icon-arrow-down-solid", "icon-arrow-up-solid"), n(document).trigger("TrackHistory.Open", [u])
            });
            else {
              var t = 0;
              u.find('[data-event="TrackHistoryComments.Toggle"].expanded').exists() && (i.Modules.FB.closeComments(l.params.historyId), t = 200);
              var r = function() {
                u.addClass("animating"), h.slideUp(200, function() {
                  u.swapClass("animating", "collapsed"), e.text("Show Recently Played"), o.hide(), s.swapClass("icon-arrow-up-solid", "icon-arrow-down-solid"), l.params.playerWindow.resizeBy({
                    height: -1 * f
                  }), n(document).trigger("TrackHistory.Close", [u])
                })
              };
              setTimeout(r, t)
            }
        }, 200, !0)), setInterval(r, 3e4)
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery),
  function(t) {
    function e(t, e) {
      for (var i = t.length; i--;)
        if (t[i] === e) return i;
      return -1
    }

    function i(t) {
      for (g in v) v[g] = t[k[g]]
    }

    function n(t, n) {
      var r, s, a, l, u;
      if (r = t.keyCode, -1 == e(x, r) && x.push(r), (93 == r || 224 == r) && (r = 91), r in v) {
        v[r] = !0;
        for (a in _) _[a] == r && (o[a] = !0)
      } else if (i(t), o.filter.call(this, t) && r in m)
        for (l = 0; l < m[r].length; l++)
          if (s = m[r][l], s.scope == n || "all" == s.scope) {
            u = s.mods.length > 0;
            for (a in v)(!v[a] && e(s.mods, +a) > -1 || v[a] && -1 == e(s.mods, +a)) && (u = !1);
            (0 != s.mods.length || v[16] || v[18] || v[17] || v[91]) && !u || s.method(t, s) === !1 && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), t.cancelBubble && (t.cancelBubble = !0))
          }
    }

    function r(t) {
      var i, n = t.keyCode,
          r = e(x, n);
      if (r >= 0 && x.splice(r, 1), (93 == n || 224 == n) && (n = 91), n in v) {
        v[n] = !1;
        for (i in _) _[i] == n && (o[i] = !1)
      }
    }

    function s() {
      for (g in v) v[g] = !1;
      for (g in _) o[g] = !1
    }

    function o(t, e, i) {
      var n, r, s, o;
      for (void 0 === i && (i = e, e = "all"), t = t.replace(/\s/g, ""), n = t.split(","), "" == n[n.length - 1] && (n[n.length - 2] += ","), s = 0; s < n.length; s++) {
        if (r = [], t = n[s].split("+"), t.length > 1) {
          for (r = t.slice(0, t.length - 1), o = 0; o < r.length; o++) r[o] = _[r[o]];
          t = [t[t.length - 1]]
        }
        t = t[0], t = w(t), t in m || (m[t] = []), m[t].push({
          shortcut: n[s],
          scope: e,
          method: i,
          key: n[s],
          mods: r
        })
      }
    }

    function a(t) {
      return "string" == typeof t && (t = w(t)), -1 != e(x, t)
    }

    function l() {
      return x.slice(0)
    }

    function u(t) {
      var e = (t.target || t.srcElement).tagName;
      return !("INPUT" == e || "SELECT" == e || "TEXTAREA" == e)
    }

    function c(t) {
      y = t || "all"
    }

    function h() {
      return y || "all"
    }

    function d(t) {
      var e, i, n;
      for (e in m)
        for (i = m[e], n = 0; n < i.length;) i[n].scope === t ? i.splice(n, 1) : n++
    }

    function f(t, e, i) {
      t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, function() {
        i(window.event)
      })
    }

    function p() {
      var e = t.key;
      return t.key = P, e
    }
    var g, m = {},
        v = {
          16: !1,
          18: !1,
          17: !1,
          91: !1
        },
        y = "all",
        _ = {
          "\u21e7": 16,
          shift: 16,
          "\u2325": 18,
          alt: 18,
          option: 18,
          "\u2303": 17,
          ctrl: 17,
          control: 17,
          "\u2318": 91,
          command: 91
        },
        b = {
          backspace: 8,
          tab: 9,
          clear: 12,
          enter: 13,
          "return": 13,
          esc: 27,
          escape: 27,
          space: 32,
          left: 37,
          up: 38,
          right: 39,
          down: 40,
          del: 46,
          "delete": 46,
          home: 36,
          end: 35,
          pageup: 33,
          pagedown: 34,
          ",": 188,
          ".": 190,
          "/": 191,
          "`": 192,
          "-": 189,
          "=": 187,
          ";": 186,
          "'": 222,
          "[": 219,
          "]": 221,
          "\\": 220
        },
        w = function(t) {
          return b[t] || t.toUpperCase().charCodeAt(0)
        },
        x = [];
    for (g = 1; 20 > g; g++) _["f" + g] = 111 + g;
    var k = {
      16: "shiftKey",
      18: "altKey",
      17: "ctrlKey",
      91: "metaKey"
    };
    for (g in _) o[g] = !1;
    f(document, "keydown", function(t) {
      n(t, y)
    }), f(document, "keyup", r), f(window, "focus", s);
    var P = t.key;
    t.key = o, t.key.setScope = c, t.key.getScope = h, t.key.deleteScope = d, t.key.filter = u, t.key.isPressed = a, t.key.getPressedKeyCodes = l, t.key.noConflict = p, "undefined" != typeof module && (module.exports = key)
  }(this),
  function(t, e) {
    function i(t) {
      return function() {
        return r.trigger(t), !1
      }
    }

    function n() {
      for (var t in s) s.hasOwnProperty(t) && window.key(t, i(s[t]))
    }
    var r = t(e);
    if (!r.data("WP.UI.KeyCommands")) {
      r.data("WP.UI.KeyCommands", !0);
      var s = {
        space: "WP.PlayPauseToggle"
      };
      n()
    }
  }(jQuery, document),
  function(t, e, i) {
    function n(t) {
      l("Volume: " + (0 === t ? "Muted" : t + "%"), !1), clearTimeout(M), M = setTimeout(function() {
        l(R.track)
      }, 1500), 0 === t && 0 !== D ? a("player muted") : 0 !== t && 0 === D && a(), D = t
    }

    function r(t) {
      x.data("src", AudioAddict.UI.img_uri(t)).attr("src", AudioAddict.UI.img_uri(t))
    }

    function s(t) {
      "track" === t.type ? x.attr("src", AudioAddict.UI.img_uri(t, {
        size: "200x200"
      }) || t.art_url || x.data("src")) : x.attr("src", x.data("src"))
    }

    function o(t) {
      "string" == typeof t && (z = t), P.text(z + (j ? " (" + j + ")" : ""))
    }

    function a(t) {
      j = t, o()
    }

    function l(t, e) {
      t && (("boolean" == typeof e ? e : !0) ? C.fadeOut(150, function() {
        i(this).html(t).fadeIn(150)
      }) : C.html(t))
    }

    function u(t) {
      return "track" === t.type && t.track_id ? void i("#wp-track-vote-buttons").html(AudioAddict.UI.Templates.render("shared/track_vote_buttons", {
        track: t
      })).find(".popdown").popdown() : void i("#wp-track-vote-buttons").html("")
    }

    function c() {
      clearTimeout(O), E = 0, B = !1, $.width(0).removeClass("animated").clearQueue()
    }

    function h() {
      var t = getUnixTimestamp() - N,
          e = 1e3 * (R.length - t),
          i = t / R.length * 100;
      $.width(i + "%"), $.animate({
        width: "100%"
      }, {
        duration: e,
        easing: "linear",
        queue: !1
      })
    }

    function d(t, e) {
      T.log("track change:", e), R = e;
      var i = e.track;
      e.url && (i = '<a href="' + e.url + '" target="_blank">' + e.track + "</a>"), c(), h(), l(i), s(e), u(e)
    }

    function f(t, e) {
      T.log("Channel changed: ", e), W = e, r(W)
    }

    function p(t, e) {
      var i;
      return e && e.type ? ("track" !== e.type || e.track_id || (i = "missing track_id", T.log(i, e), di.analytics.trackNonInteractiveEvent("WP.Error", i, JSON.stringify(e))), F = getUnixTimestamp(), N = e.started, e.timeDeterminate && N - 2 > F && (T.log("track start time is in the future, timestamps cant be used. reported is:", N, " current time is:", F), e.timeDeterminate = !1), void H.trigger("Track.Changed", [e])) : (i = "invalid item or type", T.log(i), void di.analytics.trackNonInteractiveEvent("WP.Error", i, JSON.stringify(e)))
    }

    function g(t, e) {
      var i = e.mute ? 0 : e.volume || e;
      T.log("Setting volume to: " + i), n(i)
    }

    function m() {
      o("loading...")
    }

    function v(t, e) {
      var i = parseInt(e, 10);
      2 >= i ? o("connecting...") : i > 2 && 10 >= i ? o("still connecting...") : i > 10 && o("connecting is taking longer than usual, please stand by...")
    }

    function y() {
      U = setInterval(b, 1e3), o("now playing"), A.fadeIn("fast")
    }

    function _() {
      clearTimeout(U), o("stopped"), A.fadeOut("fast", function() {
        C.empty(), S.empty(), I.empty(), $.width(0)
      })
    }

    function b() {
      var t = getUnixTimestamp(),
          e = t - N;
      if (0 > e && (T.log("elapsed time is in the past?"), e = 0, N = getUnixTimestamp(), w()), S.text(AudioAddict.Util.formatSeconds(e)), !B && R) {
        if (!R.timeDeterminate) return T.log("current track is time indeterminate"), void w();
        var i = Math.ceil(R.ended - t),
            n = e / R.length * 100;
        if (E > n) return T.log("progress is going backwards?"), void w();
        if (n >= 100) {
          T.log("progress is complete for current track"), n = 100, B = !0, i = null;
          var r = R;
          O = setTimeout(function() {
            r == R && w()
          }, 5e3)
        }
        I.text(i ? "-" + AudioAddict.Util.formatSeconds(i) : ""), E = n
      }
    }

    function w() {
      T.log("using indeterminate progress bar"), B = !0, I.empty(), $.clearQueue().width("100%").addClass("animated")
    }
    var x, k, P, A, C, S, I, T, E, M, O, j, D, F, N, L = {
          animDuration: 200,
          minIncrement: .5
        },
        H = i(document),
        $ = {
          clearQueue: i.noop
        },
        R = {},
        W = {},
        z = "stopped",
        U = null,
        B = !1;
    i(document).on({
      "Channel.Changed": f,
      "Track.Changed": d,
      "wp-connecting": v,
      "wp-connect": y,
      "wp-stop": _,
      "ui-volume": g,
      "wp-mute": g,
      "metadata-track ad-begin": p
    }), di.eventbus.on("webplayer:ad:preroll-loading", m), i(window).on("focus", $.clearQueue), NS(t).NowPlaying = e.extend({
      NS: t + ".NowPlaying",
      _required: ["nowPlayingId", "artworkId"],
      init: function(t) {
        this._super(i.extend(L, t)), T = this, x = i(this.params.artworkId), k = i(this.params.nowPlayingId), P = k.find(".status").empty(), A = k.find(".info-container"), C = k.find(".title").empty(), $ = k.find(".progress-bar"), S = k.find(".elapsed").empty(), I = k.find(".remaining").empty()
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, jQuery),
  function(t, e, i, n) {
    function r() {
      return parseInt(window.innerWidth || document.documentElement.clientWidth, 10)
    }

    function s() {
      return parseInt(window.innerHeight || document.documentElement.clientHeight, 10)
    }
    var o, a = i.WP;
    NS(t).PlayerWindow = e.extend({
      NS: t + ".PlayerWindow",
      _required: ["playerId", "resizeBrowser"],
      init: function(t) {
        this._super(t), o = n(this.params.playerId), this.baseWidth = this.currentWidth = o.outerWidth(!0), this.baseHeight = this.currentHeight = o.outerHeight(!0), (r() != this.baseWidth || s() != this.baseHeight) && this.resizeTo(this.baseWidth, this.baseHeight)
      },
      restore: function(t) {
        this.resizeTo(this.baseWidth, this.baseHeight, t)
      },
      resizeTo: function(t, e, n) {
        return this.currentWidth = t || this.currentWidth, this.currentHeight = e || this.currentHeight, this.params.resizeBrowser && i.UI.resizeTo(this.currentWidth, this.currentHeight), a.embeddedPlayer || o.width(this.currentWidth).height(this.currentHeight), this.log("Resized To:", this.currentWidth, this.currentHeight), "function" == typeof n && n(this.currentWidth, this.currentHeight), this
      },
      resizeBy: function(t, e) {
        var i = t.width ? this.currentWidth + t.width : this.currentWidth,
            n = t.height ? this.currentHeight + t.height : this.currentHeight;
        return this.resizeTo(i, n, e)
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery),
  function(t, e, i, n, r) {
    function s(t) {
      return t.label + " (" + t.bitrate + " " + t.format_label + ")"
    }

    function o(t) {
      return n(document.createElement("li")).append(n(document.createElement("label")).attr("for", t.id).append(n(document.createElement("input")).attr({
        type: "radio",
        name: "bitrate",
        id: t.id,
        value: t.value,
        disabled: t.disabled
      })).append(n(document.createElement("span")).html(t.label)))
    }
    NS(t).Settings = e.extend({
      NS: t + ".Settings",
      _required: ["panelId", "buttonId", "playerContainerId", "bitrateContainerId"],
      init: function(t, e) {
        n.cookie("wp-settings-updated") && (n.growlUI("Player Settings Updated"), n.cookie("wp-settings-updated", null)), this._super(t);
        var a = n(this.params.panelId),
            l = n(this.params.buttonId),
            u = n(this.params.playerContainerId),
            c = n(this.params.bitrateContainerId),
            h = (i.Util, i.WP);
        if (0 === a.length) return void this.log("Panel element not found, aborting.");
        n(document).on({
          "WP.ToggleSettings": function(t) {
            t.preventDefault();
            var e = n(t.target).data("page");
            return r.matchMedia("(max-width: 727px)").matches && e ? (r.location = e, !1) : void a.panel("toggle")
          },
          "WP.Settings.SetPlayer": function(t) {
            var i, r, a = n(t.target),
                l = a.val(),
                u = c.find("ul").not(".premium").find("li").remove().end();
            a.closest("li").addClass("selected").siblings().removeClass("selected"), "public" === e.getAccess() && (i = c.find("ul.premium").find("li").remove().end(), n.each(e.getBitrates("premium", l), function(t, e) {
              i.append(o({
                id: "bitrate-" + t,
                value: t,
                label: s(e),
                disabled: !0
              }))
            })), n.each(e.getBitrates(e.getAccess(), l), function(t, e) {
              u.append(o({
                id: "bitrate-" + t,
                value: t,
                label: s(e)
              }))
            }), r = u.find('[value="' + e.getBitrate() + '"]'), 0 === r.length && (r = u.find('input[type="radio"]').first()), r.trigger("click")
          }
        });
        var d = u.find('input[name="player"][value="' + e.getPlayer() + '"]');
        0 === d.length ? u.find('input[name="player"]:first').trigger("click") : d.trigger("click"), "premium" === e.getAccess() && c.find("ul.premium").hide(), a.panel({
          show: function() {
            l.addClass("active")
          },
          hide: function() {
            l.removeClass("active")
          },
          beforeSave: function() {
            return i.API.Config.authenticated ? !0 : void a.panel("message", i.API.Config.networkName + " Account Required", '<span class="warning">This feature requires a free account.</span>Create a free ' + i.API.Config.networkName + ' account to take full advantage of our service.<br>It takes just a minute to create your account, <a href="' + i.API.Static.urlJoin + '" style="font-size:14px" target="_blank">click here to join</a>')
          },
          save: function(t) {
            if (n.cookie("wp-settings-updated", !0), e.save(t.player, t.bitrate, t.popout ? "popout" : "embedded"), "webplayer" === e.player) {
              this.panel("wait", !0);
              var i = this;
              t.popout && h.embeddedPlayer ? n(document).trigger("LaunchPopoutPlayer", {
                afterLaunchCb: function() {
                  i.panel("hide"), i.panel("wait", !1)
                }
              }) : r.location.reload(!0)
            } else {
              var s = e.getStreamUrl(h.wp.channel.get().key);
              h.embeddedPlayer ? (h.wp.stop(), n.blockUI(), r.open(s), r.location.reload(!0)) : a.panel("message", "Player Selection", '<span class="warning">You have chosen to use an external player.</span>You can revert to the WebPlayer at any time by selecting <em>Player Settings</em> from your account menu.', function() {
                h.wp.stop(), r.location.href = s
              })
            }
          }
        })
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery, window),
  function(t, e, i, n) {
    function r(t) {
      return Math.round(t / y * 100)
    }

    function s(t) {
      if (t > y && (t = y), v >= t && (t = v), t != w) {
        0 === t ? p.removeClass("icon-sound").addClass("icon-mute") : 0 === w && p.removeClass("icon-mute").addClass("icon-sound"), w = t;
        var e = r(t);
        o(e), a(e)
      }
    }

    function o(t) {
      h.css("left", t + "%"), f.width(t + "%"), 0 === t ? p.removeClass("icon-sound").addClass("icon-mute") : p.removeClass("icon-mute").addClass("icon-sound")
    }

    function a(t) {
      n(document).trigger("ui-volume", t)
    }

    function l() {
      g = !0
    }

    function u() {
      g = !1
    }
    var c, h, d, f, p, g = !1,
        m = 2,
        v = 0,
        y = 1,
        _ = 0,
        b = null,
        w = null,
        x = 1;
    NS(t).Volume = e.extend({
      NS: t + ".Volume",
      _required: ["volumeId", "buttonId"],
      init: function(t) {
        var e, r;
        this._super(t), c = n(this.params.volumeId), p = n(this.params.buttonId), d = c.find(".progress-container"), e = c.find(".volume-low"), r = c.find(".volume-high"), c.css("visibility", "hidden").show(), y = d.width(), b = d.offset().left + m, c.hide().css("visibility", "visible"), f = c.find(".progress-bar").width(y), h = c.find(".handle").css("left", y), p.click(function() {
          i.WP.wp.muteToggle()
        }), e.click(function() {
          i.WP.wp.muteToggle()
        }), r.click(function() {
          i.WP.wp.unMute(), a(100)
        }), c.on("mousewheel", function(t, e) {
          t.preventDefault();
          var i = x + 10 * e;
          s(i)
        }), c.bind("mousemove", function(t) {
          g && s(t.clientX - _)
        }), d.bind("mousedown", function(t) {
          l(), t.offsetX = t.offsetX - m || t.clientX - b, _ = t.clientX - t.offsetX, s(t.offsetX), t.preventDefault()
        }), h.bind("mousedown", function(t) {
          l(), _ = t.clientX - t.target.offsetLeft, t.preventDefault()
        }), n(document).bind("mouseup", function() {
          u()
        }), n(document).bind("wp-volume", function(t, e) {
          var i = parseFloat(e.percentage);
          isNaN(i) || 0 > i || i > 100 || (x = i, o(i))
        }), n(document).bind("wp-mute", function(t, e) {
          var i = e.mute ? 0 : e.volume;
          o(i)
        })
      }
    })
  }("AudioAddict.WP.UI", AudioAddict.Modules.Base, AudioAddict, jQuery), NS("AudioAddict.WP.AdManager.providers").adswizz = function(t) {
  function e(t) {
    return decodeURIComponent(t) === t ? encodeURIComponent(t) : t
  }

  function i(t) {
    var i = c + "&context=" + (e(t) || "") + "&cb=" + Date.now();
    $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Setting banner url:", i), h.find("iframe").attr("src", i), h.show()
  }
  var n = "http://deliveryengine.di.adswizz.com/afr?zoneid=1",
      r = null,
      s = null,
      o = 10;
  if (this.type = "adswizz", this.isReady = t.yes, this.isExternal = t.no, this.hasBanner = t.yes, this.begin = function(t) {
    if ($.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Beginning ad block"), clearTimeout(r), a = t, !a.context || "" === a.context) return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: No ad context found."), !1;
    if (i(a.context), h.show(), $(document).trigger("ad-begin", [a]), di.eventbus.trigger("webplayer:ad:begin", a), (!u.wp.getLocale() || "United States" === u.wp.getLocale()) && getUnixTimestamp() - u.wp.channel.getLastChangedTimestamp() > l) {
      var e = t.duration + 600;
      $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Forcing targetspot ad in " + e / 1e3 + " seconds"), r = setTimeout(function() {
        u.wp.tempMute(), clearTimeout(s), s = setTimeout(function() {
          u.wp.tempUnMute()
        }, 1e3 * o), $(document).one("ad-begin", function() {
          clearTimeout(s)
        }), $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Forcing targetspot ad!"), $(document).trigger("player-metadata", {
          StreamTitle: "Sponsored Message TSTAG_30"
        })
      }, e)
    }
    return this
  }, this.end = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Ending ad block"), h.find("iframe").attr("src", n), h.hide(), $(document).trigger("ad-end"), di.eventbus.trigger("webplayer:ad:end"), this
  }, "undefined" == typeof t) throw "AudioAddict.WP.AdProvider_Adswizz: FATAL: Ad manager reference object not provided";
  var a, l = 120,
      u = NS("AudioAddict.WP"),
      c = NS("AudioAddict.Ad").adswizz.baseUrl,
      h = $('<div id="adprovider-adswizz" style="position: absolute; z-index: 2; top: 0; left: 0;"><iframe width="300" height="250" frameborder="0" scrolling="no"></iframe></div>').appendTo(t.canvas()).hide();
  $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Adswizz: Initialized")
}, NS("AudioAddict.WP.AdManager.providers")["default"] = function(t) {
  if (this.type = "default", this.isReady = t.yes, this.isExternal = t.no, this.hasBanner = t.yes, this.begin = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Default: Beginning ad"), e.show(), this
  }, this.end = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Default: Ending ad"), e.hide(), this
  }, "undefined" == typeof t) throw "AudioAddict.WP.AdProvider_Default: FATAL: Ad manager reference object not provided";
  var e = $("#adprovider-default").appendTo(t.canvas()).hide()
}, NS("AudioAddict.WP.AdManager.providers").internal = function(t) {
  if (this.type = "internal", this.isReady = t.yes, this.isExternal = t.no, this.hasBanner = function() {
    return e.banner
  }, this.begin = function(r) {
    return "undefined" != typeof r && r ? ($.log(LogPrefix() + "AudioAddict.WP.AdProvider_Internal: Beginning new ad"), e = r, e.banner && (n.html('<img border="0" style="position: relative;" src="' + e.banner + '"></div>'), e.url && (n.indexOf("<a href") > -1 && n.unwrap(), n.wrap('<a href="' + e.url + '" target="_blank">')), i = n.find("img").load(function() {
      setTimeout(function() {
        i.width() > t.canvas().width() && i.css("width", t.canvas().width()), i.height() > t.canvas().height() && i.css("height", t.canvas().height()), i.css("left", t.canvas().width() / 2 - i.width() / 2), i.css("top", t.canvas().height() / 2 - i.height() / 2), n.show()
      }, 100)
    })), $(document).trigger("ad-begin", [e]), di.eventbus.trigger("webplayer:ad:begin", e), this) : ($.log(LogPrefix() + "AudioAddict.WP.AdProvider_Internal: Ad is not support by this provider, aborting", r, e), $(document).trigger("ad-end"), di.eventbus.trigger("webplayer:ad:end"), this)
  }, this.end = function() {
    return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Internal: Ending ad"), e.banner && n.hide().empty(), $(document).trigger("ad-end"), di.eventbus.trigger("webplayer:ad:end"), this
  }, "undefined" == typeof t) throw "AudioAddict.WP.AdProvider_Internal: FATAL: Ad manager reference object not provided";
  var e, i, n = $('<div id="adprovider-internal" style="position: absolute; z-index: 1; top: 0; left: 0;"></div>').appendTo(t.canvas()).hide();
  $.log(LogPrefix() + "AudioAddict.WP.AdProvider_Internal: Initialized")
}, NS("AudioAddict.Ad").targetspot = {
  stations: {
    "default": "DI026",
    ambient: "DI008",
    chillout: "DI008",
    chilloutdreams: "DI008",
    chillstep: "DI008",
    psybient: "DI008",
    psychill: "DI008",
    spacemusic: "DI008",
    vocalchillout: "DI008",
    electronicpioneers: "DI008"
  }
}, NS("AudioAddict.WP.AdManager.providers").targetspot = function(t) {
  if (this.type = "targetspot", this.isExternal = t.yes, this.hasBanner = t.yes, this.isReady = function() {
    return l
  }, this.begin = function(t) {
    return l ? (c = t, n = t.duration, (!n || 0 > n || n > d) && (n = 60), $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Requesting ad block for {" + n + "} seconds", t), ts_streamEvent({
      eventType: "playAd",
      eventDuration: n
    })) : $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Ad block cannot begin because the provider is not ready; most likely, ts_swf_embed() failed"), a
  }, this.end = function() {
    return l ? (c = null, $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Ending ad block"), ts_streamEvent({
      eventType: "interruptAd"
    }), r.wp.tempUnMute(), f.find("iframe, object, embed").attr("src", "about:blank"), f.children().remove(), $(document).trigger("ad-end"), di.eventbus.trigger("webplayer:ad:end", c)) : $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Ad block cannot end because the provider is not ready; most likely, ts_swf_embed() failed"), a
  }, this.mute = function() {
    u = !0, l && ts_setVolume({
      volume: 0
    })
  }, this.unMute = function() {
    u = !1, l && ts_setVolume({
      volume: r.wp.getPlayerVolume()
    })
  }, this.isMuted = function() {
    return u
  }, $(document).bind("ad-end", function() {
    clearTimeout(i), f.hide()
  }), "undefined" == typeof t) throw "AudioAddict.WP.AdProvider_TargetSpot: FATAL: Ad manager reference object not provided";
  $('<div id="adprovider-targetspot-swf" style="position: absolute; z-index: 0; top: 0; left: 0;"></div><div id="adprovider-targetspot-visual" style="position: absolute; z-index: 2; top: 0; left: 0; width: 300px; height: 250px; overflow: hidden;"></div>').appendTo(t.canvas());
  var e, i, n, r = NS("AudioAddict.WP"),
      s = NS("AudioAddict.API"),
      o = NS("AudioAddict.Ad").targetspot.stations,
      a = this,
      l = !1,
      u = !1,
      c = null,
      h = 5,
      d = 180,
      f = $("#adprovider-targetspot-visual").hide(),
      p = r.env || "production";
  if ("development" !== p && o && o[s.Config.channel]) $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Found station ID {" + o[s.Config.channel] + "} for channel {" + s.Config.channel + "}"), e = o[s.Config.channel];
  else if ("development" === p) $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: In development env, so using sandbox Station ID: {DIGIMPORT}"), e = "DIGIMPORT";
  else {
    if (!o || !o["default"]) return $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: FATAL: No channel or default station ID available"), this;
    $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Using default station ID {" + o["default"] + "} for channel {" + s.Config.channel + "}"), e = o["default"]
  }
  window.ts_ready = function() {
    $.log(LogPrefix() + "window.ts_ready(): Ready"), l = !0, $(document).bind("wp-volume", function(t, e) {
      u = !1, ts_setVolume({
        volume: e.percentage
      })
    })
  }, window.ts_mutePlayer = function(t) {
    $.log(LogPrefix() + "window.ts_mutePlayer(): Beginning ad block"), $.log(LogPrefix() + "window.ts_mutePlayer(): TS reports {" + t + "} seconds of playback");
    try {
      $(document).trigger("ad-begin", [c, t]), di.eventbus.trigger("webplayer:ad:begin", c, t)
    } catch (e) {
      $.log(LogPrefix() + "window.ts_mutePlayer(): ERROR: " + (e && e.message ? "{" + e.message + (e.line ? " (Line: " + e.line + ")" : "") + "}" : "Unknown Error"), e)
    }
    $.log(LogPrefix() + "window.ts_mutePlayer().{ad-begin} Triggered"), t && t > 0 && d > t && (n = t), $.log(LogPrefix() + "window.ts_mutePlayer(): Failsafe timer set to {" + n + "} seconds"), f.show(), $.log(LogPrefix() + "window.ts_mutePlayer(): Setting TS SWF volume"), ts_setVolume({
      volume: r.wp.isMuted() ? 0 : r.wp.getVolume()
    }), r.wp.tempMute(), clearTimeout(i), i = setTimeout(function() {
      $.log(LogPrefix() + "window.ts_mutePlayer(): Ad block outlived its welcome, forcibly ending playback"), a.end()
    }, 1e3 * (n + h)), $.log(LogPrefix() + "window.ts_mutePlayer(): Ad block will end forcibly in {" + (n + h) + "} seconds")
  }, window.ts_unmutePlayer = function() {
    $.log(LogPrefix() + "window.ts_unmutePlayer(): Ad block ended"), c = null, r.wp.tempUnMute(), f.find("iframe, object, embed").attr("src", "about:blank"), window.setTimeout(function() {
      f.find("iframe, object, embed").remove()
    }, 10), $(document).trigger("ad-end"), di.eventbus.trigger("webplayer:ad:end")
  }, window.ts_noAds = function() {
    $.log(LogPrefix() + "window.ts_noAds(): No ads available"), r.wp.tempUnMute(), $(document).trigger("ad-begin"), di.eventbus.trigger("webplayer:ad:begin")
  }, window.tspot_ad_width = "300", window.tspot_ad_height = "250", window.tspot_container_id = "adprovider-targetspot-visual", setTimeout(function() {
    try {
      ts_swf_embed("adprovider-targetspot-swf", {
        s: e,
        v: r.wp.getVolume(),
        w: "1",
        h: "1",
        prl: "ignore",
        htmlBanner: "1",
        visualMode: "0"
      }), $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Audio SWF component embedded")
    } catch (t) {
      $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Failed to embed audio SWF component", t)
    }
  }, 1e3), $.log(LogPrefix() + "AudioAddict.WP.AdProvider_TargetSpot: Initialized")
},
  function() {
    di.provide("di.date.Timer"), di.date.Timer = function() {
      function t(t, e, i) {
        if (_.extend(this, Backbone.Events), "number" != typeof t || 0 > t) throw "Invalid Argument";
        this.time_ = t, this.vanillaTime_ = this.time_, _.isFunction(e) && (this.cb_ = e), _.isFunction(i) && (this.cb_ = i), null == this.cb_ && (this.cb_ = $.noop), this.ticks_ = 0, this.repeat_ = 0, "number" == typeof e && (this.repeat_ = Math.max(0, e)), this.running_ = !1
      }
      return t.COMPLETE = "di:date:timer:COMPLETE", t.TICK = "di:date:timer:TICK", t.START = "di:date:timer:START", t.STOP = "di:date:timer:STOP", t.RESET = "di:date:timer:RESET", t.prototype.getTime = function() {
        return this.time_
      }, t.prototype.getCount = function() {
        return this.ticks_
      }, t.prototype.running = function() {
        return this.running_
      }, t.prototype.finished = function() {
        return this.finished_
      }, t.prototype.finish_ = function() {
        return this.stop(), this.time_ = 0, this.cb_(), this.finished_ = !0, this.trigger(di.date.Timer.COMPLETE)
      }, t.prototype.onTick_ = function() {
        return this.ticks_++, this.trigger(di.date.Timer.TICK), this.ticks_ >= this.repeat_ ? this.finish_() : (this.stop(), this.time_ = this.vanillaTime_, this.start())
      }, t.prototype.start = function() {
        return this.running_ ? void 0 : (this.running_ = !0, this.started_ = new Date, this.timeoutId_ = setTimeout($.proxy(this.onTick_, this), this.time_), this.trigger(di.date.Timer.START), !0)
      }, t.prototype.stop = function() {
        var t;
        return this.running_ ? (this.running_ = !1, clearTimeout(this.timeoutId_), t = new Date - this.started_, this.time_ -= t, this.trigger(di.date.Timer.STOP), !0) : void 0
      }, t.prototype.reset = function() {
        return this.stop(), this.time_ = this.vanillaTime_, this.ticks_ = 0, this.trigger(di.date.Timer.RESET), !0
      }, t
    }()
  }.call(this),
  function() {
    var t, e, i, n, r, s, o, a;
    a = "AudioAddict.webplayer.adblocks", r = di.provide(a), r.initialized || (n = 5, t = "webplayer:adblock:begin", e = "webplayer:adblock:durationupdate", i = "webplayer:adblock:end", o = new di.log.Console(a), r.adBlockPlaying_ = !1, r.gracePeriodTimer_ = null, r.adBlockBegin = function(e) {
      return r.adBlockPlaying_ = !0, o.log("Ad block begun"), di.eventbus.trigger(t, e)
    }, r.adBlockDurationUpdate = function(t) {
      return o.log("Received duration update for ad block, {" + t + "} secs remaining + {" + n + "} secs grace period"), di.eventbus.trigger(e, t + n)
    }, r.adBlockEnd = function() {
      return r.adBlockPlaying_ = !1, o.log("Ad gap grace period (if applicable) over, ad block ended"), di.eventbus.trigger(i)
    }, r.hasVisual_ = function(t) {
      return !("internal" === (null != t ? t.provider : void 0) && null === t.banner && t.url.indexOf("/premium") < 0)
    }, r.adBegin_ = function(t, e) {
      var i;
      return r.adBlockPlaying_ && r.gracePeriodTimer_.reset(), e || !r.adBlockPlaying_ ? r.hasVisual_(t) ? (i = "preroll" === ("function" == typeof t.get ? t.get("position") : void 0), r.adBlockPlaying_ || r.adBlockBegin(i), e > 0 ? r.adBlockDurationUpdate(e) : void 0) : void o.log("Ad has no visual part, so not starting ad block") : void 0
    }, r.adEnd_ = function() {
      return r.adBlockPlaying_ ? r.gracePeriodTimer_.start() : void 0
    }, r.prerollEnd_ = function() {
      return r.gracePeriodTimer_.reset(), r.adBlockEnd()
    }, s = {
      "webplayer:ad:begin": r.adBegin_,
      "webplayer:ad:end webplayer:track:begin": r.adEnd_,
      "webplayer:ads:preroll-end": r.prerollEnd_
    }, r.initialize = function() {
      return di.eventbus.bind(s), null == r.gracePeriodTimer_ && (r.gracePeriodTimer_ = new di.date.Timer(1e3 * n, r.adBlockEnd)), r.initialized = !0, o.log("Initialized.")
    }, r.destroy = function() {
      var t;
      return di.eventbus.unbind(s), null != (t = r.gracePeriodTimer_) && t.reset(), r.adBlockPlaying_ = !1, r.initialized = !1, o.log("Destroyed.")
    })
  }.call(this),
  function() {
    var t, e, i, n;
    n = "AudioAddict.webplayer.ui.ads", t = di.provide(n), t.initialized || (i = new di.log.Console(n), t.panelId = "panel-ad", t.closeSelector = ".panel-close", t.remainingTimeSelector = ".remaining-time", t.fallbackDelay = 180, t.$panel = null, t.$closeButton = null, t.$closeButtonTimer = null, t.initialized = !1, t.uiInitialized_ = !1, t.secondsRemaining_ = null, t.countdownTimer_ = null, t.fallbackTimer_ = null, t.initializeUi_ = function() {
      return t.$panel = $("#" + t.panelId), t.$closeButton = t.$panel.find(t.closeSelector), t.$closeButtonTimer = t.$panel.find(t.remainingTimeSelector), t.$panel.exists() ? t.$closeButton.exists() ? (i.log("Initialized UI components"), t.uiInitialized_ = !0) : (i.log("Close button with selector {" + t.closeSelector + " not found, failed UI init."), !1) : (i.log("Panel element with id {" + t.panelId + "} not found, failed UI init."), !1)
    }, t.forceAdPanel_ = function() {
      var e;
      return null != (e = t.$panel) ? e.show() : void 0
    }, t.clearCountdown_ = function() {
      return t.$closeButton.hasClass("timer") && i.log("Removing close button countdown"), t.secondsRemaining_ = null, t.$closeButtonTimer.text(""), t.$closeButton.removeClass("timer"), null != t.countdownTimer_ ? (i.log("Clearing countdown timer"), t.countdownTimer_.reset(), t.countdownTimer_.off(), t.countdownTimer_ = null) : void 0
    }, t.countdownTick_ = function() {
      return t.$closeButtonTimer.text(t.secondsRemaining_ + ""), t.secondsRemaining_ -= 1
    }, t.enableClosing_ = function() {
      return t.$closeButton.removeClass("pending").removeAttr("disabled")
    }, t.fallbackAdBlockEnd_ = function() {
      return t.clearCountdown_(), i.log("Fallback timeout reached, making ad panel closeable"), t.enableClosing_(), t.fallbackTimer_.reset()
    }, t.adblockBegin = function(e) {
      return t.uiInitialized_ || t.initializeUi_() ? (i.log("Ad block begun, showing ad panel"), t.fallbackTimer_.reset(), t.fallbackTimer_.start(), t.$panel.toggleClass("preroll", e), t.$panel.panel("show"), t.$closeButton.addClass("pending").removeClass("timer").attr("disabled", "disabled")) : void 0
    }, t.adblockDurationUpdate = function(e) {
      return t.uiInitialized_ || t.initializeUi_() ? (t.clearCountdown_(), i.log("Received duration update, displaying countdown for {" + e + "} seconds"), t.$closeButton.addClass("timer"), t.secondsRemaining_ = e, t.countdownTimer_ = new di.date.Timer(1e3, e), t.countdownTimer_.on(di.date.Timer.TICK, t.countdownTick_), t.countdownTimer_.on(di.date.Timer.COMPLETE, t.clearCountdown_), t.countdownTimer_.start(), t.countdownTick_()) : void 0
    }, t.prerollEnd = function() {
      return t.enableClosing_(), t.$panel.panel("hide")
    }, t.adblockEnd = function() {
      return t.uiInitialized_ || t.initializeUi_() ? (t.fallbackTimer_.reset(), t.clearCountdown_(), i.log("Ad block ended, enabling close button"), t.enableClosing_()) : void 0
    }, e = {
      "webplayer:stream:connect": t.forceAdPanel_,
      "webplayer:adblock:begin": t.adblockBegin,
      "webplayer:adblock:durationupdate": t.adblockDurationUpdate,
      "webplayer:adblock:end": t.adblockEnd,
      "webplayer:ads:preroll-end": t.prerollEnd
    }, t.initialize = function() {
      return t.initialized ? void i.log("Already initialized, not initializing again.") : (di.eventbus.on(e), t.fallbackTimer_ = new di.date.Timer(1e3 * t.fallbackDelay, t.fallbackAdBlockEnd_), t.initialized = !0, i.log("Initialized."))
    }, t.destroy = function() {
      return t.initialized ? (di.eventbus.off(e), t.fallbackTimer_.reset(), t.clearCountdown_(), t.$panel = t.$closeButton = t.$closeButtonTimer = null, t.uiInitialized_ = !1, t.initialized = !1, i.log("Destroyed.")) : void 0
    })
  }.call(this),
  function(t, e, i, n) {
    function r(t) {
      p--, (429 === t.statusCode() || 0 === p) && (clearInterval(f), f = null)
    }

    function s(i) {
      p = d;
      var r = [];
      if (0 !== i.length) {
        _.each(i, function(e) {
          var i = "advertisement" === e.type || "jingle" === e.type;
          (!i || "" !== e.ad.url && "premium" !== t.API.Config.access) && (i && (e.url = e.ad.url), e.started ? i || (e.ended = e.started + e.length || e.duration) : (e.started = getUnixTimestamp(), e.timeDeterminate = !1), e.id = e.track_id, r[r.length] = e)
        });
        var s = getUnixTimestamp();
        r = _.sortBy(r, function(t) {
          return s - t.started
        });
        var a = _.where(r, {
          type: "track"
        })[0];
        g.id !== a.id && (r = _.reject(r, function(t) {
          return t.id === a.id
        }), g = a, o(), n(e).trigger("metadata-history-update", [r]))
      }
    }

    function o() {
      var i = n("#now-playing");
      i.find(".status").text("now playing"), i.find(".title").text(g.track), i.find(".info-container").show(), n("#wp-track-vote-buttons").html("track" === g.type ? t.UI.Templates.render("shared/track_vote_buttons", {
        track: g
      }) : ""), n(e).trigger("Track.Changed", [g])
    }

    function a() {
      l = l || n("#channel-page").data("channel-key"), u = u || n("#channel-page").data("channel-id"), new t.WP.UI.NowPlaying({
        nowPlayingId: "#now-playing",
        artworkId: "#art > img"
      }), new t.WP.UI.History({
        historyId: "#track-history",
        templateId: "shared/track_template",
        maxItems: 5,
        maxAdItems: 2,
        playerWindow: i
      }), new t.WP.UI.ChannelSelector({
        channelSelectorId: "#channel-selector",
        channelListId: "#channel-list",
        channelsPerList: API.Config.channelsPerList,
        filters: WP.filters,
        channelListHeight: WP.playerContentAreaHeight || 212,
        mobileFilterList: "#mobile-filter",
        mobileChannelList: "#mobile-channel"
      }), new t.WP.UI.Comments({
        playerWindow: i,
        isStandalone: !1
      }), t.WP.wp = t.WP.wp || {}, t.WP.wp.changeChannel = function(t) {
        i.location = "/" + t
      }, c = new API.TrackHistory(t.API.Config.url, t.API.Config.network);
      var e = function() {
        c.getChannel(u, s, r)
      };
      f = setInterval(e, h), e();
      var o = n.cookie("player") || "aac";
      n("#third-party-messaging").addClass(["aac", "wma", "mp3"].indexOf(o) >= 0 ? o : "aac"), n("#ui").addClass("ready"), n("#ctl-play").addClass("play")
    }
    if (t.WP.thirdPartyPlayer) {
      var l, u, c, h = 6e4,
          d = 3,
          f = null,
          p = d,
          g = {};
      n(a)
    }
  }(window.AudioAddict, document, window, jQuery),
  function(t, e, i, n) {
    function r() {
      s(g.flashBlocked)
    }

    function s(t) {
      n("#ui").block({
        css: {
          width: "100%"
        },
        overlayCSS: {
          opacity: .8
        },
        message: n(t).html()
      }).addClass("ready")
    }

    function o(t) {
      var e = 0 === t.major,
          i = t.major < 10 || 10 === t.major && t.minor < 2;
      if (e) throw new Error(g.flashInstall);
      if (i) throw new Error(g.flashUpdate)
    }

    function a(e) {
      if (u = NS("AudioAddict.Util"), c = NS("AudioAddict.API"), h = NS("AudioAddict.WP"), !(h.wp || h.embeddedPlayer && h.thirdPartyPlayer)) {
        try {
          o(swfobject.getFlashPlayerVersion())
        } catch (r) {
          return n.log(LogPrefix() + "AudioAddict.WP.Bootstrap: Flash install or update required. Aborting."), void s(r.message)
        }
        d = new t.Modules.PlayerSettings({
          authenticated: t.API.Config.authenticated,
          access: t.API.Config.access,
          listenUrl: t.API.Config.listenUrl,
          listenKey: t.API.Config.listenKey,
          streams: t.API.Streamsets
        }), f.playerWindow = new h.UI.PlayerWindow({
          playerId: "#ui",
          resizeBrowser: e.standalone
        }), f.volume = new h.UI.Volume({
          volumeId: "#popup-volume",
          buttonId: "#btn-volume"
        }), f.history = new h.UI.History({
          historyId: "#track-history",
          templateId: "shared/track_template",
          maxItems: 5,
          maxAdItems: 2,
          playerWindow: f.playerWindow
        }), f.np = new h.UI.NowPlaying({
          nowPlayingId: "#now-playing",
          artworkId: "#art > img"
        }), f.channelSelector = new h.UI.ChannelSelector({
          channelSelectorId: "#channel-selector",
          channelListId: "#channel-list",
          channelsPerList: c.Config.channelsPerList,
          filters: h.filters,
          channelListHeight: h.playerContentAreaHeight || 219,
          mobileFilterList: "#mobile-filter",
          mobileChannelList: "#mobile-channel"
        }), f.auth = new h.UI.Auth({
          urlLogin: c.Static.urlLogin,
          urlLogout: c.Static.urlLogout,
          loginPopupId: "#popup-login",
          loginButtonId: "#link-login",
          logoutButtonId: "#link-logout"
        }), f.feedback = new h.UI.Feedback({
          panelId: "#panel-feedback",
          buttonId: "#btn-feedback",
          submitUrl: c.Static.urlFeedback
        }), f.settings = new h.UI.Settings({
          panelId: "#panel-settings",
          buttonId: "#btn-settings",
          playerContainerId: "#settings-player",
          bitrateContainerId: "#settings-bitrate"
        }, d), f.comments = new h.UI.Comments({
          playerWindow: f.playerWindow,
          isStandalone: e.standalone
        }), "public" === d.getAccess() && (t.webplayer.adblocks.initialize(), t.webplayer.ui.ads.initialize()), p.metadata = new h.Metadata({
          url: "http://api.audioaddict.com/v1/" + e.network + "/track_history/channel/{id}.jsonp"
        }), h.wp = new WebPlayer, h.wp.init({
          player: {
            bufferTimeoutDuration: 1e4,
            swfPath: "/assets/webplayer/AudioAddict.WP2-c8c15b9652924c9fac3710d9ee9a8a98.swf",
            swfContainer: "player-swf",
            playerId: "player"
          },
          member: {
            access: c.Config.access,
            listenKey: c.Config.listenKey,
            speed: d.getBitrate()
          },
          streamlist: {
            speeds: c.Streamsets
          },
          uiPlay: {
            elemId: "play-button"
          },
          uiChannel: {
            channelTitleId: "#channel-title",
            channelDirectorId: "#channel-director"
          },
          timeKeeper: {},
          ping: {
            url: e.baseUrl + "/ping.jsonp",
            interval: 900
          },
          listenerSession: {
            interval: 6e5,
            deviceId: 6,
            url: e.baseUrl + "/" + e.network + "/listener_sessions"
          },
          adManager: {
            canvas: "#sponsor",
            cutoff: 18e4,
            providers: {
              internal: "ad.int" !== h.debug,
              adswizz: "ad.aw" !== h.debug,
              targetspot: "ad.ts" !== h.debug
            }
          },
          channel: e.channel,
          channelId: e.channelId,
          channels: e.channels,
          network: e.network,
          onReady: function() {
            var t = di.exists("webplayer.transportmanager", di.app) ? di.app.module("webplayer.transportmanager") : null;
            h.autoplay ? t ? t.playAudio(m) : h.wp.play() : t ? t.stopAudio() : h.wp.stop()
          }
        }), di.eventbus.on({
          "start:webplayer:playback": function() {
            h.wp.play()
          },
          "stop:webplayer:playback": function() {
            h.wp.stop()
          }
        }), i.player = h.wp, n("#ui").addClass("ready")
      }
    }

    function l() {
      var t = NS("AudioAddict.API").Config,
          e = NS("AudioAddict.WP");
      i.run = function() {
        a({
          channels: e.channels,
          channel: t.channel,
          channelId: t.channelId,
          network: t.network,
          baseUrl: t.url,
          standalone: !e.embeddedPlayer
        })
      }, i.playerReady = !0;
      var r = !1;
      try {
        r = e.embeddedPlayer || i.opener && (i.opener === i || "boolean" == typeof i.opener.delayRun && !i.opener.delayRun), e.embeddedPlayer ? r = !0 : i.opener === i ? r = !0 : i.opener && (r = !i.opener.delayRun, m = !!i.opener.skipPreroll)
      } catch (s) {
        n.log("wp: caught err"), n.log(s)
      }
      r && i.run()
    }
    if (!t.WP.thirdPartyPlayer) {
      var u, c, h, d, f = {},
          p = {},
          g = {
            flashInstall: "#alert-flash-install",
            flashUpdate: "#alert-flash-update",
            flashBlocked: "#alert-flash-blocked"
          },
          m = !1;
      n(e).on("WP.InitError", r).on("ready", l), i.forceBlockUI = s
    }
  }(window.AudioAddict, document, window, jQuery);