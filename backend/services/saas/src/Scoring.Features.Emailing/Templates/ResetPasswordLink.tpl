<tr style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
    <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
        <table border="1" cellpadding="0" cellspacing="0" width="100%" class="table" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FBFCFC; padding: 40px 54px 42px;">
            <tbody>
            <tr style="border: 0 none; border-collapse: separate;">
                <td style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: sans-serif;font-weight: 300; color: #1D2531; font-size: 25.45455px;" valign="middle">
                    {{L "ResetPassword:Description" model.username}}
                </td>
            </tr>
            <tr style="border: 0 none; border-collapse: separate;">
                <td style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-top: 38px;" valign="middle">
                    <a href="{{model.confirm_action_url}}" target="_blank" style="-webkit-border-radius: 4px; font-family: sans-serif; font-weight: 500; font-size: 13.63636px; line-height: 15px; display: inline-block; letter-spacing: .7px; text-decoration: none; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background-color: #f50057; color: #fff; padding: 12px 24px;">
                        {{model.confirm_action_title}}
                    </a>
                </td>
            </tr>
            <tr style="border: 0 none; border-collapse: separate;">
                <td style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: sans-serif;font-weight: 300; font-size: 12.72727px; font-style: italic; padding-top: 52px;" valign="middle">
                    {{L "ResetPassword:Footer"}}
                </td>
            </tr>
            </tbody>
        </table>
    </td>
</tr>