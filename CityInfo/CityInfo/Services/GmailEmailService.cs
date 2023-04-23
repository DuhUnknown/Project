using CityInfo.Models;
using System.Diagnostics;

namespace CityInfo.Services
{
  public class GmailEmailService : IMailService
  {
    private string _mailTo = "admin@mycompany.com";
    private string _mailFrom = "noreply@mycompany.com";

    public void Send(string subject, string message)
    {
      // send mail - output to debug window
      Debug.WriteLine($"Mail from {_mailFrom} to {_mailTo}, with GmailMailService.");
      Debug.WriteLine($"Subject: {subject}");
      Debug.WriteLine($"Message: {message}");
    }
  }
}
