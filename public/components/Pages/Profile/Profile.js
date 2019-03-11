'use strict';
const pug = require('pug');

const template = `p ID: #{ID} <br/> Username: #{Username} <br/>
img(src=Avatar)`;
const templateGen = pug.compile(template);

import {Headline} from '../../Headline/Headline.js';
import {Icon} from '../../Icon/Icon.js';
import {Button} from '../../Button/Button.js';
import {Image} from '../../Image/Image.js';

import {AjaxModule} from '../../../modules/ajax.js';
import {RenderModule} from '../../../modules/render.js';
import {CookieModule} from '../../../modules/cookie.js';
import {AuthModule} from '../../../modules/auth.js';


export class Profile{
    render() {
        const rendererProfile = new RenderModule();
        const ajax = new AjaxModule();
        const cookieMod = new CookieModule();
        const authMod = new AuthModule();
        const application = document.getElementById('application');

        if (!authMod.isAuthorised()) {
            rendererProfile.render(application, menu);
        }

        const outer = document.createElement('div');
        outer.classList.add('centered');

        let headline = new Headline({size: 'h1', textContent: 'Мой профиль'});

        outer.appendChild(new Icon({
            src: './static/home-icon.png',
            handler: () => {
                rendererProfile.render(application, 'menu');
            }
        }).render());
        outer.appendChild(headline.render());

        let myId = cookieMod.getCookie('user_id');
        let pathToMe = '/users/' + myId;

        ajax.doGet({
            path: pathToMe
        })
        .then ((response) => {
            console.log(response);
            response.json()
            .then ((res) => {
                let info = document.createElement('div');
                info.innerHTML = templateGen({ID: res['ID'], Username: res['Username'], Avatar: res['Avatar']});
                outer.appendChild(info);
            })
            .cath ((err) => {
                // catch
            })

        })
        .catch ((error) => {
            console.log(error.response);
            error.response.json()
            .catch (
                // catch the exception
            )
        });

        return outer;
    }
}