var abp = abp || {};
(function () {

    abp.tokenCookieName = "App.AuthToken"
    abp.tokenHeaderName = "Authorization"
    abp.appPath = abp.appPath || '/';
    
    /* Utils */

    abp.utils = abp.utils || {};

    abp.utils.addAntiForgeryTokenToXhr = function addAntiForgeryTokenToXhr(xhr) {
        const antiForgeryToken = abp.security.antiForgery.getCsrfToken();
        if (antiForgeryToken) {
            xhr.setRequestHeader(abp.security.antiForgery.tokenHeaderName, antiForgeryToken);
        }
    }
    
    abp.utils.setCookieValue = function (key, value, expireDate, path) {
        var cookieValue = encodeURIComponent(key) + '=';
        if (value) {
            cookieValue = cookieValue + encodeURIComponent(value);
        }
        if (expireDate) {
            cookieValue = cookieValue + "; expires=" + expireDate.toUTCString();
        }
        if (path) {
            cookieValue = cookieValue + "; path=" + path;
        }
        document.cookie = cookieValue;
    };

    /**
     * Gets a cookie with given key.
     * This is a simple implementation created to be used by ABP.
     * Please use a complete cookie library if you need.
     * @param {string} key
     * @returns {string} Cookie value or null
     */
    abp.utils.getCookieValue = function (key) {
        let equalities = document.cookie.split('; ');
        for (let i = 0; i < equalities.length; i++) {
            if (!equalities[i]) {
                continue;
            }
            var splitted = equalities[i].split('=');
            if (splitted.length !== 2) {
                continue;
            }
            if (decodeURIComponent(splitted[0]) === key) {
                return decodeURIComponent(splitted[1] || '');
            }
        }

        return null;
    };

    /* Security */

    abp.security = abp.security || {};
    abp.security.antiForgery = abp.security.antiForgery || {};

    abp.security.antiForgery.tokenCookieName = 'XSRF-TOKEN';
    abp.security.antiForgery.tokenHeaderName = 'X-XSRF-TOKEN';

    abp.security.antiForgery.getCsrfToken = function () {
        return abp.utils.getCookieValue(abp.security.antiForgery.tokenCookieName);
    };
    
    /* Auth */

    abp.auth = abp.auth || {};

    abp.auth.getAuthToken = function () {
        return abp.utils.getCookieValue(abp.tokenCookieName);
    }

    abp.auth.setAuthToken = function (authToken, expireDate) {
        abp.utils.setCookieValue(abp.tokenCookieName, authToken, expireDate, abp.appPath);
    };

    abp.auth.clearToken = function () {
        abp.auth.setAuthToken();
    }

    abp.auth.logout = function () {
        abp.auth.clearToken();
    }

    /* Swagger */

    abp.swagger = abp.swagger || {};

    abp.swagger.addAuthToken = function () {
        const authToken = abp.auth.getAuthToken();
        if (!authToken) return false;
        const cookieAuth = new SwaggerClient.ApiKeyAuthorization(abp.tokenHeaderName, 'Bearer ' + authToken, 'header');
        swaggerUi.api.clientAuthorizations.add('bearerAuth', cookieAuth);
        return true;
    }

    abp.swagger.addCsrfToken = function () {
        const csrfToken = abp.security.antiForgery.getCsrfToken();
        if (!csrfToken) return false;
        var csrfCookieAuth = new SwaggerClient.ApiKeyAuthorization(abp.security.antiForgery.tokenHeaderName, csrfToken, 'header');
        swaggerUi.api.clientAuthorizations.add(abp.security.antiForgery.tokenHeaderName, csrfCookieAuth);
        return true;
    }

    function loginUserInternal(tenantId, callback) {
        const usernameOrEmailAddress = document.getElementById('usernameOrEmail').value;
        if (!usernameOrEmailAddress) {
            alert('Username or Email Address is required, please try with a valid value !');
            return false;
        }

        const password = document.getElementById('password').value;
        if (!password) {
            alert('Password is required, please try with a valid value !');
            return false;
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    const expireDate = new Date(Date.now() + (result.expireInSeconds));
                    abp.auth.setAuthToken(result.accessToken, expireDate);
                    callback();
                } else {
                    alert('Login failed !');
                }
            }
        };

        xhr.open('POST', '/api/account/auth/authenticate', true);
        abp.utils.addAntiForgeryTokenToXhr(xhr);
        if (tenantId) xhr.setRequestHeader('__tenant', tenantId);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(`{"usernameOrEmail": "${usernameOrEmailAddress}", "password": "${password}"}`);
    }

    abp.swagger.login = function (callback) {
        //Get TenantId first
        const tenancyName = document.getElementById('tenancyName').value;
        if (tenancyName) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    if (result.success) { // Tenant exists and active.
                        loginUserInternal(result.tenantId, callback); // Login for tenant    
                    } else {
                        alert('There is no such tenant or tenant is not active !');
                    }
                }
            };
            
            xhr.open('POST', '/api/multiTenancy/registration/lookupByName', true);
            abp.utils.addAntiForgeryTokenToXhr(xhr);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(`{"tenancyName": "${tenancyName}"}`);
        } else {
            loginUserInternal(null, callback); // Login for host
        }
    };

    abp.swagger.closeAuthDialog = function () {
        if (document.getElementById('abp-auth-dialog')) {
            document.getElementsByClassName("swagger-ui")[1].removeChild(document.getElementById('abp-auth-dialog'));
        }
    }

    abp.swagger.openAuthDialog = function (loginCallback) {
        abp.swagger.closeAuthDialog();

        var abpAuthDialog = document.createElement('div');
        abpAuthDialog.className = 'dialog-ux';
        abpAuthDialog.id = 'abp-auth-dialog';

        document.getElementsByClassName("swagger-ui")[1].appendChild(abpAuthDialog);

        // -- backdrop-ux
        var backdropUx = document.createElement('div');
        backdropUx.className = 'backdrop-ux';
        abpAuthDialog.appendChild(backdropUx);

        // -- modal-ux
        var modalUx = document.createElement('div');
        modalUx.className = 'modal-ux';
        abpAuthDialog.appendChild(modalUx);

        // -- -- modal-dialog-ux
        var modalDialogUx = document.createElement('div');
        modalDialogUx.className = 'modal-dialog-ux';
        modalUx.appendChild(modalDialogUx);

        // -- -- -- modal-ux-inner
        var modalUxInner = document.createElement('div');
        modalUxInner.className = 'modal-ux-inner';
        modalDialogUx.appendChild(modalUxInner);

        // -- -- -- -- modal-ux-header
        var modalUxHeader = document.createElement('div');
        modalUxHeader.className = 'modal-ux-header';
        modalUxInner.appendChild(modalUxHeader);

        var modalHeader = document.createElement('h3');
        modalHeader.innerText = 'Authorize';
        modalUxHeader.appendChild(modalHeader);

        // -- -- -- -- modal-ux-content
        var modalUxContent = document.createElement('div');
        modalUxContent.className = 'modal-ux-content';
        modalUxInner.appendChild(modalUxContent);

        modalUxContent.onkeydown = function (e) {
            if (e.keyCode === 13) {
                //try to login when user presses enter on authorize modal
                abp.swagger.login(loginCallback);
            }
        };

        //Inputs
        createInput(modalUxContent, 'tenancyName', 'TenancyName');
        createInput(modalUxContent, 'usernameOrEmail', 'UsernameOrEmail');
        createInput(modalUxContent, 'password', 'Password', 'password');

        //Buttons
        var authBtnWrapper = document.createElement('div');
        authBtnWrapper.className = 'auth-btn-wrapper';
        modalUxContent.appendChild(authBtnWrapper);

        //Close button
        var closeButton = document.createElement('button');
        closeButton.className = 'btn modal-btn auth btn-done button';
        closeButton.innerText = 'Close';
        closeButton.style.marginRight = '5px';
        closeButton.onclick = abp.swagger.closeAuthDialog;
        authBtnWrapper.appendChild(closeButton);

        //Authorize button
        var authorizeButton = document.createElement('button');
        authorizeButton.className = 'btn modal-btn auth authorize button';
        authorizeButton.innerText = 'Login';
        authorizeButton.onclick = function () {
            abp.swagger.login(loginCallback);
        };
        authBtnWrapper.appendChild(authorizeButton);
    }

    function createInput(container, id, title, type) {
        var wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        container.appendChild(wrapper);

        var label = document.createElement('label');
        label.innerText = title;
        wrapper.appendChild(label);

        var section = document.createElement('section');
        section.className = 'block-tablet col-10-tablet block-desktop col-10-desktop';
        wrapper.appendChild(section);

        var input = document.createElement('input');
        input.id = id;
        input.type = type ? type : 'text';
        input.style.width = '100%';

        section.appendChild(input);
    }

})();