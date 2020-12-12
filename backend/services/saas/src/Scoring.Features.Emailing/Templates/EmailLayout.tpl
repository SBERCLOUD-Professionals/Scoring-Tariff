<!DOCTYPE html>
<html lang="{{culture}}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        @media screen and (max-width: 720px) {
            body .container {
                width: 100% !important;
                max-width: 720px !important;
            }

            body .container .content {
                display: none !important;
            }

            body .container .content .contentContainer .contentBody .table,
            body .container .content .contentContainer .table,
            body .container .content .contentContainer .table {
                border-width: 1px 0 0 !important;
            }

            body .container .content .contentContainer .contentFooter .table {
                border-width: 1px 0 !important;
            }

            body .container .content .contentContainer .contentBody .table {
                padding-left: 12px !important;
                padding-right: 12px !important;
            }

            body .container .content .contentContainer .table,
            body .container .content .contentContainer .table {
                padding-left: 8px !important;
                padding-right: 8px !important;
            }

            body .container .footer .footerSep {
                display: none !important;
            }
        }

        @media screen and (max-width: 720px) {
            body .container .footer .footerContainer {
                padding-bottom: 10px !important;
            }
        }
    </style>
    <title>{{title}}</title>
</head>

<body style="margin: 0; padding: 0; font-family: sans-serif;font-weight: 300; font-stretch: normal; font-size: 14px; letter-spacing: .35px; background: #EFF3F6; color: #333333;">
<table border="1" cellpadding="0" cellspacing="0" align="center" class="container" style="border: 0 none; border-collapse: separate; width: 720px;" width="720">
    <tbody>
    <tr style="border: 0 none; border-collapse: separate; height: 114px;">
        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="contentContainer" style="border: 0 none; border-collapse: separate;">
                <tbody>
                <tr align="center" style="border: 0 none; border-collapse: separate; padding: 16px 0 15px;">
                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                        <img alt="" src="https://249801.selcdn.ru/scoring/public/email/logo.png" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 64px; width: 64px;" width="64" height="64">
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr class="content" style="border: 0 none; border-collapse: separate; -webkit-box-shadow: 0 3px 5px rgba(0,0,0,0.04); -moz-box-shadow: 0 3px 5px rgba(0,0,0,0.04); box-shadow: 0 3px 5px rgba(0,0,0,0.04);">
        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="contentContainer" style="border: 0 none; border-collapse: separate; width: 100%;" width="100%">
                <tbody>
                    <tr class="contentBody" style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
                        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                            <table border="1" cellpadding="0" cellspacing="0" width="100%" class="table" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FBFCFC; padding: 40px 54px 42px;">
                                <tbody>
                                {{ content }}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    
                    {{ if description != null && description != empty }}
                        <tr class="contentFooter" style="border: 0 none; border-collapse: separate;">
                            <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                                <table border="1" cellpadding="0" cellspacing="0" width="100%" class="table" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; background: #FFFFFF; border-width: 1px; font-size: 11.81818px; text-align: center; padding: 18px 40px 20px;"
                                       align="center">
                                    <tbody>
                                    <tr style="border: 0 none; border-collapse: separate;">
                                        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                                            <span>{{description}}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    {{ end }}
                
                </tbody>
            </table>
        </td>
    </tr>
    <tr class="footer" style="border: 0 none; border-collapse: separate;">
        <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table border="1" cellpadding="0" cellspacing="0" width="100%" class="footerContainer" style="border: 0 none; border-collapse: separate; padding-top: 26px; padding-bottom: 26px;">
                <tbody>
                <tr style="border: 0 none; border-collapse: separate;">
                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                        <table border="1" cellpadding="0" cellspacing="0" width="35%" align="center" style="border: 0 none; border-collapse: separate; font-size: 10.90909px; text-align: center;">
                            <tbody>
                            <tr style="border: 0 none; border-collapse: separate;">
                                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://scoring.ru" target="_blank" class="c-1cmrz5j" style="text-decoration: underline; color: #7F8FA4;">Главная</a></td>
                                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://scoring.ru/register" target="_blank" class="c-1cmrz5j" style="text-decoration: underline; color: #7F8FA4;">Регистрация</a></td>
                                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><a href="https://scoring.ru" target="_blank" class="c-1cmrz5j" style="text-decoration: underline; color: #7F8FA4;">Помощь</a></td>
                            </tr>
                            </tbody>
                        </table>
                        <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate; font-size: 10.90909px; text-align: center; color: #7F8FA4; padding-top: 22px;" align="center">
                            <tbody>
                            <tr style="border: 0 none; border-collapse: separate;">
                                <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">© 2020 Scoring - Все права защищены.</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border: 0 none; border-collapse: separate;">
                <tbody>
                <tr class="footerSep" style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle"><img alt="" src="https://249801.selcdn.ru/scoring/public/email/separator.png" style="border: 0 none; line-height: 100%; outline: none; text-decoration: none; height: 2px; width: 719px;" width="719" height="2"></td>
                </tr>
                <tr style="border: 0 none; border-collapse: separate;">
                    <td align="center"  style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-top: 15px; padding-bottom: 22px;" valign="middle">
                        <a href="https://scoring.ru" target="_blank" style="color: #000000; text-decoration: none;">
                            <table border="1" cellpadding="0" cellspacing="0" style="border: 0 none; border-collapse: separate;">
                                <tbody>
                                <tr style="border: 0 none; border-collapse: separate;">
                                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: sans-serif;font-weight: 400; color: #b3b6b8; font-size: 12.5px; text-transform: lowercase;" valign="middle">
                                        Команда
                                    </td>
                                    <td style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-left: 6px;" valign="middle"><img alt="" src="https://249801.selcdn.ru/scoring/public/email/logo-footer.png" class="c-1280od" style="line-height: 100%; outline: none; text-decoration: none; border: 0 none; height: 20px; width: 52px;" width="52" height="20"></td>
                                </tr>
                                </tbody>
                            </table>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>