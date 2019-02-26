/**
 * Service to get Lock, Unlock & RefreshLock
 *
 * @class org.ekstep.services.lockService
 * @author Kartheek Palla <kartheekp@ilimi.in>
 */
org.ekstep.services.lockService = new (org.ekstep.services.iService.extend({
	/**
     * @member {string} lockURL
     * @memberof org.ekstep.services.lockService
     */
	lockURL: function () {
		return this.getBaseURL() + this.getAPISlug() + this.getConfig('lockEndPoint', '/lock')
	},
	/**
    * This method is used to create lock
    * @param  {object}   requestObj
    * @param  {Function} callback returns error and response as arguments
    * @memberof org.ekstep.services.lockService
    */
	createLock: function (request, callback) {
		var instance = this
		instance.getFingerPrintId(function () {
			var headersObj = _.cloneDeep(instance.requestHeaders)
			headersObj.headers['X-device-Id'] = Telemetry.fingerPrintId
			instance.postFromService(instance.lockURL() + instance.getConfig('createLockUrl', '/v1/create'), request, headersObj, callback)
		})
	},
	/**
     * This method is used to refresh lock
     * @param  {object}   requestObj
     * @param  {Function} callback returns error and response as arguments
     * @memberof org.ekstep.services.lockService
     */
	refreshLock: function (request, callback) {
		var instance = this
		instance.getFingerPrintId(function () {
			var headersObj = _.cloneDeep(instance.requestHeaders)
			headersObj.headers['X-device-Id'] = Telemetry.fingerPrintId
			instance.patch(instance.lockURL() + instance.getConfig('refreshLockUrl', '/v1/refresh'), request, headersObj, callback)
		})
	},
	/**
     * This method is used to delete lock
     * @param  {object}   requestObj
     * @param  {Function} callback returns error and response as arguments
     * @memberof org.ekstep.services.lockService
     */
	deleteLock: function (request, callback) {
		var instance = this
		instance.getFingerPrintId(function () {
			var headersObj = _.cloneDeep(instance.requestHeaders)
			headersObj.headers['X-device-Id'] = Telemetry.fingerPrintId
			instance.delete(instance.lockURL() + instance.getConfig('deleteLockUrl', '/v1/retire'), request, headersObj, callback)
		})
	},
	getFingerPrintId: function (cb) {
		if (Telemetry.fingerPrintId) {
			cb()
			return
		}
		Telemetry.getFingerPrint(function (result, components) {
			Telemetry.fingerPrintId = result
			cb()
		})
	}
}))()