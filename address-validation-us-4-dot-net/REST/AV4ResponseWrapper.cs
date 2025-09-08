using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace address_validation_us_4_dot_net.REST
{
    public class AV4ResponseWrapper
    {
        public ValidateAddressResponse? ValidateAddressResponse;
        public ProblemDetails? ProblemDetails;
        public AV4ResponseWrapper() { }
    }
}
