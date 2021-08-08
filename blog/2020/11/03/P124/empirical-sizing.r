## Strategy: For a bunch of Ns, compute the z_star by achieving desired alpha, then
## compute what beta would be for that N using the acquired z_star. 
## Pick the smallest N at which beta crosses the desired value

# Inputs:
#   The desired alpha for a two-tailed test
# Returns: The z-critical value
get_z_star = function(alpha) {
    return(-qnorm(alpha / 2))
}

# Inputs:
#   z-star: The z-critical value
#   s: The standard error of the metric at N=1
#   d_min: The practical significance level
#   N: The sample size of each group of the experiment
# Returns: The beta value of the two-tailed test
get_beta = function(z_star, s, d_min, N) {
    SE = s /  sqrt(N)
    return(pnorm(z_star * SE, mean=d_min, sd=SE))
}

# Inputs:
#   s: The standard error of the metric with N=1 in each group
#   d_min: The practical significance level
#   Ns: The sample sizes to try
#   alpha: The desired alpha level of the test
#   beta: The desired beta level of the test
# Returns: The smallest N out of the given Ns that will achieve the desired
#          beta. There should be at least N samples in each group of the experiment.
#          If none of the given Ns will work, returns -1. N is the number of
#          samples in each group.

required_size = function(s, d_min, Ns=1:20000, alpha=0.05, beta=0.2) {
    for (N in Ns) {
        if (get_beta(get_z_star(alpha), s, d_min, N) <= beta) {
            return(N)
        }
    }
    
    return(-1)
}

# Example analytic usage
# This is the example from Lesson 1, for which the online calculate gave 3,623
# samples in each group

# s is the pooled standard error for N=1 in each group,
# which is sqrt(p*(1-p)*(1/1 + 1/1))
required_size(s=sqrt(0.1*0.9*2), d_min=0.02)

# Sizing: Example
# Cookie-based diversion
# Since the standard error is proportional to 1/sqrt(N), s, or
# the standard error for N=1, is equal to the mesaured standard error with 5000
# in each group times sqrt(5000)
required_size(s=0.00515*sqrt(5000), d_min=0.02)
# User-id-based diversion
required_size(s=0.0119*sqrt(5000), d_min=0.02)

# Sizing: Quiz
# Original size
required_size(s=0.0628*sqrt(1000), d_min=0.01, Ns=seq(10, 500000, 100))
# Size with event-based diversion
required_size(s=0.0209*sqrt(1000), d_min=0.01, Ns=seq(10, 500000, 100))
# Size with event-based diversion and English-only traffic
required_size(s=0.0188*sqrt(1000), d_min=0.015)
# Size with cookie-based diversion, English-only traffic, and 
# click-through-probability instead of click-through-rate
required_size(s=0.0445*sqrt(1000), d_min=0.015, Ns=seq(10, 500000, 100))