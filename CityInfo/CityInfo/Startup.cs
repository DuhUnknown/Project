using CityInfo.Contexts;
using CityInfo.Models;
using CityInfo.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc()
           .AddMvcOptions(options =>
           {
             options.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());

           });

      services.AddDbContext<CityInfoContext>(o =>
      {
          o.UseSqlServer("Server=(local);Database=CityInfoDB;Trusted_Connection=True;");

      });
            services.AddControllers()
              .AddNewtonsoftJson(options =>
              {
                  options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
              })
              .AddJsonOptions(options =>
              {
                  options.JsonSerializerOptions.PropertyNamingPolicy = null;
              });
            services.AddDbContext<UserPasswordContext>(options =>
     options.UseSqlServer("Server=(local);Database=CityInfoDB;Trusted_Connection=True;"));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      services.AddControllers().AddNewtonsoftJson(x =>
 x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


#if DEBUG
      services.AddTransient<IMailService, OutlookEmailService>();
#else
      services.AddTransient<IMailService, GmailEmailService>();

#endif

      services.AddCors(options =>
      {
        options.AddDefaultPolicy(
          policy =>
          {
            policy.WithOrigins("http://localhost:3030").AllowAnyHeader().AllowAnyMethod();
          });
        });
      }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();

      app.UseCors();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
