import { StyleSheet } from 'react-native'
// colors
const themeColor = '#00639c'; const blackColor = '#000000'; const greyColor = '#cccccc'; const darkGreyColor = '#aaa'; const errColor = '#dc3545'; const whiteColor = '#fff'
// sizes
const fs12 = 12; const fs14 = 14; const fs23 = 23; const fs25 = 25;
const five = 5; const ten = 10; const twenty = 20; const thirty = 30; const forty = 40; const fifty = 50;

export default StyleSheet.create({
    // Helper styles
    blueBg: { backgroundColor: themeColor },
    content: { paddingHorizontal: thirty },
    h1: { color: whiteColor, fontWeight: 'bold', marginBottom: twenty, marginTop: thirty },
    dFlex: { display: 'flex' }, fBold: {fontWeight: 'bold'}, whiteTxt: {color: whiteColor},
    flex1: { flex: 1 },
    dFlexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    roundedButton: { borderRadius: 15, backgroundColor: whiteColor, width: fifty, height: fifty, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fs20: { fontSize: twenty },
    fs23: { fontSize: fs23 },
    fs25: { fontSize: fs25 },
    p10: { padding: ten },
    ph10: { paddingHorizontal: ten },
    mb10: {marginBottom: ten}, mb20: {marginBottom: twenty}, mb40: {marginBottom: forty}, 
    mt10: {marginTop: ten}, mt30: {marginTop: thirty},
    logo: { width: 40, resizeMode: 'contain' },
    common: { backgroundColor: greyColor },
    image: { height: 220, width: 220 },
    activeIcon: { color: themeColor, fontSize: fs23 },
    icon: { color: blackColor, fontSize: fs23 },
    input: { color: blackColor, fontSize: fs14 },
    redColor: { color: 'red' },
    themeColor: { color: themeColor },
    error: { fontSize: fs14, alignSelf: 'center', color: errColor },
    noData: { fontSize: fs14, alignSelf: 'center', marginTop: 20 },
    // Comment Footer
    commentFooter: { backgroundColor: whiteColor },
    footerItem: { width: '100%', backgroundColor: '#ccc', paddingHorizontal: ten, marginBottom: five },
    // Image Upload
    uploadAvatar: { width: '100%' },
    image: {height: 100, width: 100},
    userImage: {height: 250, width: 250, borderRadius: 250},
    imageBox: {backgroundColor: whiteColor,width: 250,height: 250,alignSelf: 'center',borderRadius: 250,marginTop: thirty,marginBottom: twenty,justifyContent: 'center',alignItems: 'center'},
    // Profile
    profileIconBtn: { borderWidth: 1, borderColor: '#000000', paddingHorizontal: ten, borderRadius: five, paddingVertical: five }
})










