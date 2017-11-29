using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaUtilities
{
    public class Nova
    {
        public async Task<object> CheckForConfig(dynamic input)
        {            
            if (File.Exists(input.Path))
            {
                return new { Success = true };
            }
            else
            {
                var task = await Task.Run(() => File.WriteAllBytes(input.Path, Encoding.UTF8.GetString(input.DefaultConfig)));
                return task;
            }
        }

        public async Task<object> WriteNewConfig(dynamic config)
        {
            var task = await Task.Run(() => File.WriteAllBytes(config.Path, Encoding.UTF8.GetString(config.DefaultConfig)));

            return task;
        }
    }

    public class Config
    {
        
    }
}
