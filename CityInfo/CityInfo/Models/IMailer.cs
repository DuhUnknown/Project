namespace CityInfo.Models
{
  public interface IMailService
  {
    void Send(string subject, string message);
  }
}
