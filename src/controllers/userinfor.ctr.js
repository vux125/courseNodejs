const userinfo = require('../services/userinfo');

const userInfor = async (req, res) => {
    const student = req.query.msv;
    console.log("userinfor: ", userinfo.getPersonalInformation(student));
    res.render('userinfor', {
        userinfo: await userinfo.getPersonalInformation(student),
    })
}

const userFee = async (req, res) => {
    const student = req.query.msv;
    console.log("userinfor: ", userinfo.infoFeeOfStudent(student));
    res.render('userinfor', {
        userinfo: await userinfo.infoFeeOfStudent(student),
    })
}

const userPoint = async (req, res) => {
    const student = req.query.msv;
    console.log("userinfor: ", userinfo.infoPointOfSemester(student));
    res.render('userinfor', {
        userinfo: await userinfo.infoPointOfSemester(student),
    })
}

module.exports = userInfor, userFee, userPoint;