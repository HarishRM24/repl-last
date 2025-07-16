
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('6jm1rWF3iq_f3MIPl');

export const sendContactEmail = async (formData) => {
  try {
    // Debug: Log the IDs being used
    console.log('Service ID:', 'service_22hpwud');
    console.log('Template ID:', 'template_oajrojx');
    console.log('Public Key:', '6jm1rWF3iq_f3MIPl');
    
    const templateParams = {
      to_email: 'hr@ntimes.ai',
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company || 'Not specified',
      service: formData.service || 'Not specified',
      message: formData.message,
      reply_to: formData.email
    };

    console.log('Sending email with params:', templateParams);

    const result = await emailjs.send(
      'service_22hpwud',
      'template_oajrojx',
      templateParams
    );

    console.log('Email sent successfully to hr@ntimes.ai:', result);
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS Error Details:', error);
    return { success: false, error: error.message };
  }
};
