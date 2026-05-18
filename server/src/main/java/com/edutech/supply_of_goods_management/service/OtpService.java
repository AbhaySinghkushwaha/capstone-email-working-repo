package com.edutech.supply_of_goods_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final int OTP_EXPIRY_MINUTES = 1;

    @Autowired
    private SendGridEmailService emailService;

    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

    public void sendOtp(String email) {

        String normalizedEmail = normalizeEmail(email);

        String otp = generateOtp();

        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES);

<<<<<<< HEAD
        OtpData otpData = new OtpData(otp, expiryTime, false);

        otpStore.put(normalizedEmail, otpData);

=======
        // ✅ new OTP resets verified=false
        otpStore.put(normalizedEmail, new OtpData(otp, expiryTime, false));

        // ✅ If email fails, SendGridEmailService will throw (your service does that)
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        emailService.sendOtpEmail(normalizedEmail, otp);
    }

    public boolean verifyOtp(String email, String otp) {

        String normalizedEmail = normalizeEmail(email);
<<<<<<< HEAD
=======
        String enteredOtp = normalizeOtp(otp); // ✅ FIX
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

        OtpData otpData = otpStore.get(normalizedEmail);

        if (otpData == null) {
            return false;
        }

<<<<<<< HEAD
=======
        // ✅ expired => remove & fail
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        if (LocalDateTime.now().isAfter(otpData.getExpiryTime())) {
            otpStore.remove(normalizedEmail);
            return false;
        }

<<<<<<< HEAD
        if (!otpData.getOtp().equals(otp)) {
            return false;
        }

        otpData.setVerified(true);
        otpStore.put(normalizedEmail, otpData);

=======
        // ✅ WRONG OTP => DO NOT REMOVE (allows retry within 1 min)
        if (!otpData.getOtp().equals(enteredOtp)) {
            return false;
        }

        // ✅ correct => mark verified
        otpData.setVerified(true);
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        return true;
    }

    public boolean isEmailVerified(String email) {

        String normalizedEmail = normalizeEmail(email);
<<<<<<< HEAD

=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        OtpData otpData = otpStore.get(normalizedEmail);

        if (otpData == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(otpData.getExpiryTime())) {
            otpStore.remove(normalizedEmail);
            return false;
        }

        return otpData.isVerified();
    }

    public void clearOtp(String email) {
        otpStore.remove(normalizeEmail(email));
    }

    private String generateOtp() {
        Random random = new Random();
        int number = 100000 + random.nextInt(900000);
        return String.valueOf(number);
    }

    private String normalizeEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

<<<<<<< HEAD
    private static class OtpData {

        private String otp;
        private LocalDateTime expiryTime;
=======
    // ✅ KEY FIX: remove spaces / trim so "123456 " doesn't fail
    private String normalizeOtp(String otp) {
        if (otp == null) return "";
        return otp.trim().replaceAll("\\s+", "");
    }

    private static class OtpData {

        private final String otp;
        private final LocalDateTime expiryTime;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        private boolean verified;

        public OtpData(String otp, LocalDateTime expiryTime, boolean verified) {
            this.otp = otp;
            this.expiryTime = expiryTime;
            this.verified = verified;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }

        public boolean isVerified() {
            return verified;
        }

        public void setVerified(boolean verified) {
            this.verified = verified;
        }
    }
}