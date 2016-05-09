<?php
    try {
        
        require ("./config.php");
        require ("./php-mailer/PHPMailerAutoload.php");
          
        // print_r($_REQUEST);
            
        if (empty($_REQUEST["name"]) || empty($_REQUEST["email"]) || empty($_REQUEST["subject"]) || empty($_REQUEST["message"])) {
            http_response_code (400);
            return;
        }
        
        $name = $_REQUEST["name"];
        $email = $_REQUEST["email"];
        $subject = $_REQUEST["subject"];
        $message = $_REQUEST["message"];
        
        $mail = new PHPMailer;

        $mail->SMTPDebug = 0;                               

        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';                                   
        $mail->Host = Config::$SMTP_HOST;  
        $mail->SMTPAuth = Config::$SMTP_AUTH;
        $mail->Username = Config::$SMTP_USER;
        $mail->Password = Config::$SMTP_PASS;
        $mail->SMTPSecure = Config::$SMTP_TYPE;
        $mail->Port = Config::$SMTP_PORT;
        
        $mail->SMTPOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
                "allow_self_signed" => true
            )
        );
        
        $mail->From = $email;
        $mail->FromName = $name;
        $mail->addAddress(Config::$RECIPIENT_MAIL, Config::$RECIPIENT_NAME);
        $mail->addReplyTo($email, $name);

        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = $message; 

        if(!$mail->send()) {
            http_response_code (500);
        }
        
        return;
        
    } catch (Exception $e) {
        http_response_code (500);
        return;
    }
?>