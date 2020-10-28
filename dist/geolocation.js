import { start, stop, addLocationListener, _options } from "./amap-geolocation";
/**
 * 定位错误信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionError
 */
export class PositionError {
    constructor(code, message, location) {
        this.code = code;
        this.message = message;
        this.location = location;
    }
}
let watchId = 0;
const watchMap = {};
/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
 */
export default class Geolocation {
    /**
     * 获取当前位置信息
     *
     * 注意：使用该方法会停止持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
     */
    static getCurrentPosition(success, error, options = {}) {
        const listener = addLocationListener((location) => {
            if (location.errorCode) {
                error &&
                    error(new PositionError(location.errorCode, location.errorInfo, location));
                stop();
                return listener.remove();
            }
            if (_options.locatingWithReGeocode &&
                typeof location.address !== "string") {
                return;
            }
            success(toPosition(location));
            stop();
            return listener.remove();
        });
        start();
    }
    /**
     * 注册监听器进行持续定位
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition
     */
    static watchPosition(success, error, options) {
        watchMap[++watchId] = addLocationListener((location) => {
            if (location.errorCode) {
                error &&
                    error(new PositionError(location.errorCode, location.errorInfo, location));
            }
            else {
                success(toPosition(location));
            }
        });
        start();
        return watchId;
    }
    /**
     * 移除位置监听
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch
     */
    static clearWatch(id) {
        const listener = watchMap[id];
        if (listener) {
            listener.remove();
        }
    }
}
function toPosition(location) {
    return {
        location,
        coords: {
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: location.altitude,
            accuracy: location.accuracy,
            altitudeAccuracy: null,
            heading: location.heading,
            speed: location.speed,
        },
        timestamp: location.timestamp,
    };
}
